import { createContext } from 'react';
import { IAuthContext } from './auth-context.interface';

export const AUTH_CONTEXT = createContext<IAuthContext>({} as IAuthContext);
