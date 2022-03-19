import { createContext } from 'react';
import { IOrderContext } from './ordering-context.interface';

export const ORDER_CONTEXT = createContext<IOrderContext>({} as IOrderContext);
