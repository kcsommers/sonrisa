import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { OrderableItem } from '@core';
import { cloneDeep } from 'lodash';

export const ADD_ITEM = 'ADD_ITEM';

export const REMOVE_ITEM = 'REMOVE_ITEM';

export interface CartState {
  items: OrderableItem[];
}

export const initialState: CartState = {
  items: [],
};

export const addItem = (item: OrderableItem) =>
  <const>{
    type: ADD_ITEM,
    item,
  };

export const removeItem = (item: OrderableItem) =>
  <const>{
    type: REMOVE_ITEM,
    item,
  };

export const cartReducer: Reducer<CartState | undefined, AnyAction> = (
  state = initialState,
  action
): CartState => {
  switch (action.type) {
    case ADD_ITEM: {
      const clonedState = cloneDeep(state);

      // look for item in cart
      const itemIndex = clonedState.items.findIndex((i) => i.id);

      // if it exists, replace it
      if (itemIndex > -1) {
        clonedState.items.splice(itemIndex, 1, action.item);
      } else {
        // otherwise add it
        clonedState.items.push(action.item);
      }

      return clonedState;
    }
    case REMOVE_ITEM: {
      const clonedState = cloneDeep(state);
      clonedState.items = clonedState.items.filter(
        (i) => i.id !== action.item.id
      );

      return clonedState;
    }
    default:
      return state;
  }
};
