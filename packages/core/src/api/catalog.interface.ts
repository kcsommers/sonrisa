import { CatalogImage, CatalogObject } from 'square';

export interface ICatalog {
  catalogItems: CatalogObject[];
  catalogImageMap: { [imageId: string]: CatalogImage };
}
