import { useContext } from 'react';
import { ORDER_CONTEXT } from './order.context';

export const useOrder = () => {
  return useContext(ORDER_CONTEXT);
};
