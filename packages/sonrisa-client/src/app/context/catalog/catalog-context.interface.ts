import { ICatalog, ICatalogCategoryMap } from '@sonrisa/core';

export interface ICatalogContex {
  catalog: ICatalog;
  catalogError: string;
  categoryMapByName: ICatalogCategoryMap;
}
