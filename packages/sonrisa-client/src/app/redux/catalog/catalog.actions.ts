import { CatalogObject } from 'square';

export const SET_CATALOG_IMAGE_MAP = 'SET_CATALOG_IMAGE_MAP';

export const SET_MAIN_CATALOG_ITEMS = 'SET_MAIN_CATALOG_ITEMS';

export const SET_SPECIALS_CATALOG_ITEMS = 'SET_SPECIALS_CATALOG_ITEMS';

export const setCatalogImageMap = (imageMap: { [imageId: string]: string[] }) =>
  <const>{
    type: SET_CATALOG_IMAGE_MAP,
    imageMap,
  };

export const setMainCatalogItems = (items: CatalogObject[]) =>
  <const>{
    type: SET_MAIN_CATALOG_ITEMS,
    items,
  };

export const setSpecialsCatalogItems = (items: CatalogObject[]) =>
  <const>{
    type: SET_SPECIALS_CATALOG_ITEMS,
    items,
  };
