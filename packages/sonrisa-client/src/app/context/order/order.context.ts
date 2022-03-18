import { createContext } from 'react';
import { IOrderContext } from './order-context.interface';

export const ORDER_CONTEXT = createContext<IOrderContext>({} as IOrderContext);
