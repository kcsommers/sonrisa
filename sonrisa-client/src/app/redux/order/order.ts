import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { Order, OrderLineItem } from 'square';

export const SET_ORDER = 'SET_ORDER';

export const SET_ORDER_ID = 'SET_ORDER_ID';

export const SET_ORDER_ITEMS = 'SET_ORDER_ITEMS';

const initialState = <Order | any>{
  id: '',

  location_id: '',

  customer_id: '',

  line_items: [],

  state: '',

  total_money: {
    amount: 0,
    currency: 'USD',
  },

  total_tax_money: {
    amount: 0,
    currency: 'USD',
  },

  total_tip_money: {
    amount: 0,
    currency: 'USD',
  },
};

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

export const orderReducer: Reducer<Order | undefined | any, AnyAction> = (
  state = initialState,
  action
): Order => {
  switch (action.type) {
    case SET_ORDER: {
      return action.order;
    }
    case SET_ORDER_ITEMS: {
      const clonedState = cloneDeep(state);
      // clonedState.items = action.items;

      return clonedState;
    }
    case SET_ORDER_ID: {
      const clonedState = cloneDeep(state);
      // clonedState._id = action.id;

      return clonedState;
    }
    default:
      return state;
  }
};
