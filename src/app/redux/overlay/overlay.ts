export const TOGGLE_OVERLAY = 'TOGGLE_OVERLAY';

export type OverlayState = {
  isOpen: boolean;
  template: any;
  canClose: boolean;
  onClose: () => void;
};

const initialState: OverlayState = {
  isOpen: false,
  template: null,
  canClose: true,
  onClose: () => {},
};

export const toggleOverlay = (state: OverlayState) => ({
  type: TOGGLE_OVERLAY,
  payload: state,
});

export type OverlayAction = ReturnType<typeof toggleOverlay>;

export function overlayReducer(
  state = initialState,
  action: OverlayAction
): OverlayState {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return state;
    default:
      return state;
  }
}
