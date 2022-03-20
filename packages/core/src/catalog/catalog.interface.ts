import { ICatalogCategoryMap, ICatalogImageMap } from 'catalog';
import { CatalogObject } from 'square';

export interface ICatalog {
  catalogObjects: CatalogObject[];
  catalogCategoryMap: ICatalogCategoryMap;
  catalogImageMap: ICatalogImageMap;
}
