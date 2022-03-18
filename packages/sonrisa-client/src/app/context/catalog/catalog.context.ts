import { createContext } from 'react';
import { ICatalogContex } from './catalog-context.interface';

export const CATALOG_CONTEXT = createContext<ICatalogContex>(
  {} as ICatalogContex
);
