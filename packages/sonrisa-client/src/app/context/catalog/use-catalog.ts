import { useContext } from 'react';
import { CATALOG_CONTEXT } from './catalog.context';

export const useCatalog = () => {
  return useContext(CATALOG_CONTEXT);
};
