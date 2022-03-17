import { Api, logger } from '@core';
import { useEffect, useState } from 'react';
import { CatalogImage, CatalogObject } from 'square';
import { CATALOG_CONTEXT } from './catalog.context';

export const CatalogContextProvider = ({ children }) => {
  const [catalogItems, setCatalogItems] = useState<CatalogObject[]>([]);

  const [catalogImageMap, setCatalogImageMap] = useState<{
    [itemId: string]: CatalogImage;
  }>({});

  const [catalogError, setCatalogError] = useState<string>('');

  useEffect(() => {
    const fetchCatalog = async () => {
      if (catalogItems && catalogItems.length) {
        return;
      }
      try {
        // get axios response and return the data property
        const _response = await Api.getCatalog();
        setCatalogItems(_response.data.catalogItems);
        setCatalogImageMap(_response.data.catalogImageMap);
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
        catalogItems,
        catalogImageMap,
        catalogError,
      }}
    >
      {children}
    </CATALOG_CONTEXT.Provider>
  );
};
