import { IOrderItem } from '@core';
import { IOrder } from 'app/core/ordering/IOrder';
import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

export const SET_ORDER = 'SET_ORDER';

export const SET_ORDER_ID = 'SET_ORDER_ID';

export const SET_ORDER_ITEMS = 'SET_ORDER_ITEMS';

const initialState: IOrder = {
  customer: '',

  items: [],

  _id: '',
};

export const setOrder = (order: IOrder) =>
  <const>{
    type: SET_ORDER,
    order,
  };

export const setOrderId = (id: string) =>
  <const>{
    type: SET_ORDER_ID,
    id,
  };

export const setOrderItems = (items: IOrderItem[]) =>
  <const>{
    type: SET_ORDER_ITEMS,
    items,
  };

export const orderReducer: Reducer<IOrder | undefined, AnyAction> = (
  state = initialState,
  action
): IOrder => {
  switch (action.type) {
    case SET_ORDER: {
      return action.order;
    }
    case SET_ORDER_ITEMS: {
      const clonedState = cloneDeep(state);
      clonedState.items = action.items;

      return clonedState;
    }
    case SET_ORDER_ID: {
      const clonedState = cloneDeep(state);
      clonedState._id = action.id;

      return clonedState;
    }
    default:
      return state;
  }
};
