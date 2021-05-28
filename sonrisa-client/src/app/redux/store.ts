import { configureStore } from '@reduxjs/toolkit';
import { overlayReducer } from './overlay/overylay';
import { cartReducer } from './cart/cart';
import { orderReducer } from './order/order';

export const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { overlay: OverlayState }
export type AppDispatch = typeof store.dispatch;
