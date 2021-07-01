import { CatalogObject } from 'square';

export const SET_CATALOG_IMAGE_MAP = 'SET_CATALOG_IMAGE_MAP';

export const SET_CATALOG_ITEMS = 'SET_CATALOG_ITEMS';

export const setCatalogImageMap = (imageMap: { [imageId: string]: string[] }) =>
  <const>{
    type: SET_CATALOG_IMAGE_MAP,
    imageMap,
  };

export const setCatalogItems = (items: CatalogObject[]) =>
  <const>{
    type: SET_CATALOG_ITEMS,
    items,
  };
