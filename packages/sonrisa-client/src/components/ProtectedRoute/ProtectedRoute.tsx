import { IAdmin } from '@sonrisa/core';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../context';
import { useStorage } from '../../hooks';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const { admin, verifyUserToken } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const { getStorageItem, storageKeys } = useStorage();

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

  return initialized ? (
    <Route
      {...restOfProps}
      render={(props) =>
        admin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  ) : (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem 0',
      }}
    >
      <LoadingSpinner />
    </div>
  );
};

export default ProtectedRoute;
