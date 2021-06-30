import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { Order } from '@square';
import { SET_ORDER } from './order.actions';

const initialState = <Order>{
  id: '',

  location_id: '',

  customer_id: '',

  line_items: [],

  state: '',

  total_money: {
    amount: BigInt(0),
    currency: 'USD',
  },

  total_tax_money: {
    amount: BigInt(0),
    currency: 'USD',
  },

  total_tip_money: {
    amount: BigInt(0),
    currency: 'USD',
  },

  version: 0,
};

export const orderReducer: Reducer<Order | undefined, AnyAction> = (
  state = initialState,
  action
): Order => {
  switch (action.type) {
    case SET_ORDER: {
      return action.order;
    }
    default:
      return state;
  }
};
