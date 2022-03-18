import { Order } from 'square';

export const SET_ORDER = 'SET_ORDER';

export const SET_ACCEPTING_ORDERS = 'SET_ACCEPTING_ORDERS';

export const setOrder = (order: Order | null) =>
  <const>{
    type: SET_ORDER,
    order,
  };

export const setAcceptingOrders = (accepting: boolean, reason = '') =>
  <const>{
    type: SET_ACCEPTING_ORDERS,
    accepting,
    reason,
  };
