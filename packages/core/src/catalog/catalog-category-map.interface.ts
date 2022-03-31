import { CatalogCategory, CatalogImage, CatalogObject } from 'square';

export interface ICatalogCategoryMap {
  [categoryId: string]: {
    category: CatalogCategory;
    catalogObjects: {
      item: CatalogObject;
      image: CatalogImage;
    }[];
  };
}
