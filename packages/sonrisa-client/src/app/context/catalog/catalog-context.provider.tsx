import { ICatalog } from 'packages/core/dist/bundles';
import { useEffect, useState } from 'react';
import { CatalogImage, CatalogObject } from 'square';
import { Api } from '../../api';
import { logger } from '../../utils';
import { CATALOG_CONTEXT } from './catalog.context';

export const CatalogContextProvider = ({ children }) => {
  const [catalog, setCatalog] = useState<ICatalog>();

  const [catalogError, setCatalogError] = useState<string>('');

  useEffect(() => {
    const fetchCatalog = async () => {
      if (catalog) {
        return;
      }
      try {
        // get axios response and return the data property
        const _response = await Api.getCatalog();
        setCatalog(_response.data);
        logger.log('[get catalog response]:::: ', _response.data);
      } catch (err: any) {
        // reject the promise on error
        logger.error(err);
        setCatalogError(
          'Unexpected error fetching menu items. Please refresh the page to try again.'
        );
      }
    };
    fetchCatalog();
  }, []);

  return (
    <CATALOG_CONTEXT.Provider
      value={{
        catalog,
        catalogError,
      }}
    >
      {children}
    </CATALOG_CONTEXT.Provider>
  );
};
