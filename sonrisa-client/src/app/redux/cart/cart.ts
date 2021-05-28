import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

export const TOGGLE_CART = 'TOGGLE_CART';

export interface CartState {
  isOpen: boolean;
}

const initialState: CartState = {
  isOpen: false,
};

export const toggleCart = (isOpen: boolean) =>
  <const>{
    type: TOGGLE_CART,
    isOpen,
  };

export const cartReducer: Reducer<CartState | undefined, AnyAction> = (
  state = initialState,
  action
): CartState => {
  switch (action.type) {
    case TOGGLE_CART: {
      const clonedState = cloneDeep(state);
      clonedState.isOpen = action.isOpen;

      return clonedState;
    }
    default:
      return state;
  }
};
