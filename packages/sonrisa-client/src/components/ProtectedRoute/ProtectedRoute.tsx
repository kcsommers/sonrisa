import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authInitialized && !isLoggedIn) {
      router.push('/login');
    }
  }, [authInitialized, isLoggedIn]);

  if (!authInitialized) {
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
