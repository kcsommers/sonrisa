import { useContext } from 'react';
import { AUTH_CONTEXT } from './auth.context';

export const useAuth = () => {
  return useContext(AUTH_CONTEXT);
};
