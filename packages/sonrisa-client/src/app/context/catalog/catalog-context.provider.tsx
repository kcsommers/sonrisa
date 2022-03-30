import { ICatalog, ICatalogCategoryMap } from 'packages/core/dist/bundles';
import { useEffect, useMemo, useState } from 'react';
import { Api } from '../../api';
import { logger } from '../../utils';
import { CATALOG_CONTEXT } from './catalog.context';

export const CatalogContextProvider = ({ children }) => {
  const [catalog, setCatalog] = useState<ICatalog>();
  const [catalogError, setCatalogError] = useState<string>('');

  const categoryMapByName = useMemo<ICatalogCategoryMap>(() => {
    if (!catalog) {
      return catalog;
    }
    const categoryMap: ICatalogCategoryMap = catalog.catalogCategoryMap;
    const filteredMap = Object.keys(categoryMap).reduce((map, categoryId) => {
      const categoryObjects = categoryMap[categoryId].catalogObjects;
      if (!categoryObjects || !categoryObjects.length) {
        return map;
      }
      const categoryName = categoryMap[categoryId].category.name;
      map[categoryName] = categoryMap[categoryId];
      return map;
    }, {});
    return filteredMap;
  }, [catalog]);

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
        categoryMapByName,
        catalogError,
      }}
    >
      {children}
    </CATALOG_CONTEXT.Provider>
  );
};
