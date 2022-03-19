import { ICatalogCategoryMap } from 'catalog/catalog-category-map.interface';
import { CatalogImage, CatalogObject } from 'square';

export interface ICatalog {
  catalogObjects: CatalogObject[];
  catalogCategoryMap: ICatalogCategoryMap;
}
