import { useContext } from 'react';
import { ORDER_CONTEXT } from './ordering.context';

export const useOrdering = () => {
  return useContext(ORDER_CONTEXT);
};
