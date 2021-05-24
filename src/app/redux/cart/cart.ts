import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { IOrderableItem } from '@core';
import { cloneDeep } from 'lodash';

export const ADD_ITEM = 'ADD_ITEM';

export const REMOVE_ITEM = 'REMOVE_ITEM';

export interface CartState {
  items: IOrderableItem[];
}

const initialState: CartState = {
  items: [],
};

export const addItem = (item: IOrderableItem, quantity: number) =>
  <const>{
    type: ADD_ITEM,
    item,
    quantity,
  };

export const removeItem = (item: IOrderableItem) =>
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
      const clonedItem = cloneDeep(action.item);

      clonedItem.quantity = action.quantity;

      // look for item in cart
      const itemIndex = clonedState.items.findIndex(
        (i) => i.id === action.item.id
      );

      // if it exists, replace it
      if (itemIndex > -1) {
        clonedState.items.splice(itemIndex, 1, clonedItem);
      } else {
        // otherwise add it
        clonedState.items.push(clonedItem);
      }

      return clonedState;
    }
    case REMOVE_ITEM: {
      console.log('REMOVE:::: ', action.item);
      const clonedState = cloneDeep(state);
      console.log('INDEX:::: ', clonedState.items);
      clonedState.items = clonedState.items.filter(
        (i) => i.id !== action.item.id
      );

      console.log('ITEMS @:::: ', clonedState.items);
      return clonedState;
    }
    default:
      return state;
  }
};
