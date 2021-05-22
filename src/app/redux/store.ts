import { configureStore } from '@reduxjs/toolkit';
import { overlayReducer } from './overlay/overylay';

export const store = configureStore({
  reducer: {
    overlay: overlayReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { overlay: OverlayState }
export type AppDispatch = typeof store.dispatch;
