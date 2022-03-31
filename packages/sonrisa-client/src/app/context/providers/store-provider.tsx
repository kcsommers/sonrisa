import { CatalogContextProvider } from '../catalog';
import { OrderContextProvider } from '../ordering';

export const StoreProvider = ({ children }) => {
  return (
    <OrderContextProvider>
      <CatalogContextProvider>{children}</CatalogContextProvider>
    </OrderContextProvider>
  );
};
