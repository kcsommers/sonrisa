import { CatalogContextProvider } from '../catalog/catalog-context.provider';
import { OrderContextProvider } from '../ordering/ordering-context.provider';

export const StoreProvider = ({ children }) => {
  return (
    <OrderContextProvider>
      <CatalogContextProvider>{children}</CatalogContextProvider>
    </OrderContextProvider>
  );
};
