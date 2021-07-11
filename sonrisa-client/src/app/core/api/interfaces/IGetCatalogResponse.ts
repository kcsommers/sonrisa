import { CatalogObject } from 'square';

export interface IGetCatalogResponse {
  mainCatalogItems: CatalogObject[];

  specialsCatalogItems: CatalogObject[];

  catalogImageMap: { [imageId: string]: string[] };
}
