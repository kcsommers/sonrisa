import { CatalogContextProvider } from '../catalog';
import { OrderContextProvider } from '../order';

export const StoreProvider = ({ children }) => {
  return (
    <OrderContextProvider>
      <CatalogContextProvider>{children}</CatalogContextProvider>
    </OrderContextProvider>
  );
};
