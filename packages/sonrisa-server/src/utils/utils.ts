import { camelCase } from 'lodash';
import { CatalogObject } from 'square';

export const getItemVariationId = (item: CatalogObject): string => {
  return item.itemData?.variations?.[0].id || '';
};

export const getItemImageId = (item: CatalogObject): string => {
  return item.imageId;
};

export const camelcaseKeys = <T>(o: T): any => {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = camelcaseKeys(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = camelCase(origKey);
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = camelcaseKeys(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
};
