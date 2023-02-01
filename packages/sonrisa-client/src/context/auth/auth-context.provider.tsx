import axios from 'axios';
import { IAdmin, ILoginCredentials } from 'packages/core/dist/bundles';
import { useEffect, useState } from 'react';
import { environments } from '../../environments';
import { useStorage } from '../../hooks/use-storage';
import { AUTH_CONTEXT } from './auth.context';

const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState<IAdmin>();
  const { getStorageItem, setStorageItem, storageKeys } = useStorage();

  useEffect(() => {
    const cachedAdmin: string = getStorageItem(storageKeys.ADMIN);
    if (!cachedAdmin) {
      return;
    }
    const admin: IAdmin = JSON.parse(cachedAdmin);
    verifyUserToken(admin);
  }, []);

  const logUserIn = async (
    credentials: ILoginCredentials
  ): Promise<boolean> => {
    try {
      const loginResponse = await axios.post<IAdmin>(
        `${BASE_URL}/auth/login`,
        credentials
      );
      setAdmin(loginResponse.data);
      setStorageItem(storageKeys.ADMIN, JSON.stringify(loginResponse.data));
      return true;
    } catch (error: any) {
      setAdmin(undefined);
      setStorageItem(storageKeys.ADMIN, '');
      return false;
    }
  };

  const verifyUserToken = async (user: IAdmin): Promise<boolean> => {
    try {
      const verifyResponse = await axios.post<boolean>(
        `${BASE_URL}/auth/verify`,
        { token: user.token }
      );
      if (verifyResponse.data) {
        setAdmin(user);
      } else {
        setAdmin(undefined);
        setStorageItem(storageKeys.ADMIN, '');
      }
      return true;
    } catch (error: any) {
      setAdmin(undefined);
      setStorageItem(storageKeys.ADMIN, '');
      return false;
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!admin);
  }, [admin]);

  const logUserOut = (): Promise<boolean> => {
    return Promise.resolve(true);
  };

  return (
    <AUTH_CONTEXT.Provider
      value={{ admin, logUserIn, logUserOut, verifyUserToken, isLoggedIn }}
    >
      {children}
    </AUTH_CONTEXT.Provider>
  );
};
