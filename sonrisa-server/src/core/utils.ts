import camelcaseKeys from 'camelcase-keys';
import { CatalogObject } from 'square';

export const getCamelcaseKeys = <T>(data: any): T => {
  try {
    const _res = <T>camelcaseKeys(data, { deep: true });
    return _res;
  } catch (err) {
    return null;
  }
};

export const getItemVariationId = (item: CatalogObject): string => {
  return item.itemData?.variations?.[0].id || '';
};

export const getItemImageId = (item: CatalogObject): string => {
  return item.imageId;
};
