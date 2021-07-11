import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { Order } from 'square';
import { SET_ORDER, SET_ACCEPTING_ORDERS } from './order.actions';

interface IOrderState {
  order: Order;

  accepting: boolean;

  notAcceptingReason: string;
}

const initialState: IOrderState = {
  order: {
    id: '',

    locationId: '',

    customerId: '',

    lineItems: [],

    state: '',

    fulfillments: [],

    totalMoney: {
      amount: '0',
      currency: 'USD',
    },

    totalTaxMoney: {
      amount: '0',
      currency: 'USD',
    },

    totalTipMoney: {
      amount: '0',
      currency: 'USD',
    },

    version: 0,
  },

  accepting: true,

  notAcceptingReason: '',
};

export const orderReducer: Reducer<IOrderState | undefined, AnyAction> = (
  state = initialState,
  action
): IOrderState => {
  switch (action.type) {
    case SET_ORDER: {
      const _clonedState = cloneDeep(state);

      _clonedState.order = action.order;
      return _clonedState;
    }

    case SET_ACCEPTING_ORDERS: {
      const _clonedState = cloneDeep(state);

      _clonedState.accepting = action.accepting;
      _clonedState.notAcceptingReason = action.reason;

      return _clonedState;
    }
    default:
      return state;
  }
};
