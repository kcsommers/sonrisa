import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart/cart';
import { catalogReducer } from './catalog/catalog.reducer';
import { orderReducer } from './order/order.reducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    catalog: catalogReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { overlay: OverlayState }
export type AppDispatch = typeof store.dispatch;
