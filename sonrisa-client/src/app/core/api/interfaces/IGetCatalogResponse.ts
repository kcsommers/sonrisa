import { CatalogImage, CatalogObject } from 'square';

export interface IGetCatalogResponse {
  catalogItems: CatalogObject[];
  catalogImageMap: { [imageId: string]: CatalogImage };
}
