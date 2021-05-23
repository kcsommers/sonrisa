import { OverlayTemplates } from '@core';
import { Reducer } from 'react';
import { AnyAction } from 'redux';

export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY';

export interface OverlayState {
  isOpen: boolean;
  template: OverlayTemplates;
  context: any;
}

export const initialState: OverlayState = {
  isOpen: false,
  template: OverlayTemplates.NONE,
  context: null,
};

export const toggleOverlay = (state: OverlayState) =>
  <const>{
    type: TOGGLE_OVERLAY,
    state,
  };

export const overlayReducer: Reducer<OverlayState | undefined, AnyAction> = (
  state = initialState,
  action
): OverlayState => {
  switch (action.type) {
    case TOGGLE_OVERLAY: {
      return {
        isOpen: action.state.isOpen,
        template: action.state.template,
        context: action.state.context,
      };
    }
    default:
      return state;
  }
};
