import { CatalogImage, CatalogObject } from 'square';

export interface ICatalogContex {
  catalogItems: CatalogObject[];
  catalogImageMap: { [imageId: string]: CatalogImage }; // <imageId, imgUrl>
  catalogError: string;
}
