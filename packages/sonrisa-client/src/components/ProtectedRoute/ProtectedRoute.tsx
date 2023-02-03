import { IAdmin } from '@sonrisa/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthContextProvider, useAuth } from '../../context';
import { useStorage } from '../../hooks/use-storage';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

const ProtectedRouteChild = ({ children }) => {
  const { admin, verifyUserToken, isLoggedIn } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const { getStorageItem, storageKeys } = useStorage();
  const router = useRouter();

  useEffect(() => {
    if (admin) {
      setInitialized(true);
      return;
    }
    const cachedAdmin: string = getStorageItem(storageKeys.ADMIN);
    if (!cachedAdmin) {
      setInitialized(true);
      return;
    }
    const verifyToken = async (): Promise<boolean> => {
      const admin: IAdmin = JSON.parse(cachedAdmin);
      return verifyUserToken(admin);
    };
    verifyToken().finally(() => setInitialized(true));
  }, []);

  useEffect(() => {
    console.log('is:::: ', initialized, isLoggedIn);
    if (initialized && !isLoggedIn) {
      router.push('/login');
    }
  }, [initialized, isLoggedIn]);

  if (!initialized) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem 0',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return isLoggedIn && children;
};

export const ProtectedRoute = ({ children }) => {
  return (
    <AuthContextProvider>
      <ProtectedRouteChild>{children}</ProtectedRouteChild>
    </AuthContextProvider>
  );
};
