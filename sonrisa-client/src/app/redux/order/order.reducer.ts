import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { Order } from 'square';
import { SET_ORDER } from './order.actions';

const initialState = <Order>{
  id: '',

  locationId: '',

  customerId: '',

  line_items: [],

  state: '',

  totalMoney: {
    amount: BigInt(0),
    currency: 'USD',
  },

  totalTaxMoney: {
    amount: BigInt(0),
    currency: 'USD',
  },

  totalTipMoney: {
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