import { Order, OrderLineItem } from 'square';

export const SET_ORDER = 'SET_ORDER';

export const SET_ORDER_ID = 'SET_ORDER_ID';

export const SET_ORDER_ITEMS = 'SET_ORDER_ITEMS';

export const setOrder = (order: Order) =>
  <const>{
    type: SET_ORDER,
    order,
  };

export const setOrderId = (id: string) =>
  <const>{
    type: SET_ORDER_ID,
    id,
  };

export const setOrderItems = (items: OrderLineItem[]) =>
  <const>{
    type: SET_ORDER_ITEMS,
    items,
  };
