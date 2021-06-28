import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart/cart';
import { orderReducer } from './order/order.reducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { overlay: OverlayState }
export type AppDispatch = typeof store.dispatch;
