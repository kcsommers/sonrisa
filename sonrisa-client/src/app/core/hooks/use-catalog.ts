import { useState } from 'react';
import { CatalogObject } from 'square';
import { Api } from '../api/api';
import { CatalogObjectTypes } from '../catalog/CatalogObjectTypes';
import { logger } from '../logger';

export interface ICatalogHook {
  setCatalogObjects: () => Promise<boolean>;

  catalogItems: CatalogObject[];

  catalogImageMap: Map<string, string>; // <imageId, imgUrl>
}

export const useCatalog = (): ICatalogHook => {
  const [catalogItems, setCatalogItems] = useState<CatalogObject[]>([]);

  const [catalogImageMap, setCatalogImageMap] = useState(
    new Map<string, string>()
  );

  /**
   * Fetches and sets the entire square catalog if it hasn't already been done
   * @returns Promise<boolean>
   */
  const setCatalogObjects = async (): Promise<boolean> => {
    // check cache and resolve promise if present
    if (catalogItems && catalogItems.length) {
      return true;
    }

    try {
      // get axios response and return the data property
      const _response = await Api.getCatalog();
      const _imageMap = new Map<string, string>();
      const _items = <CatalogObject[]>_response.data.filter((catalogObject) => {
        // if its a catalog item add it to the array
        if (catalogObject.type === CatalogObjectTypes.ITEM) {
          // the price needs to be converted from a string to bigint
          // in this very gross way
          if (
            catalogObject.itemData?.variations?.[0]?.itemVariationData
              ?.priceMoney
          ) {
            catalogObject.itemData.variations[0].itemVariationData.priceMoney.amount =
              BigInt(
                catalogObject.itemData?.variations?.[0]?.itemVariationData
                  ?.priceMoney?.amount ?? 0
              );
          }

          return true;
        }

        // if its an image filter it out and store the url
        if (catalogObject.type === CatalogObjectTypes.IMAGE) {
          _imageMap.set(catalogObject.id, <string>catalogObject.imageData?.url);
          return false;
        }

        return false;
      });

      logger.log('Catalog Items:::: ', _items);
      setCatalogItems(_items);
      setCatalogImageMap(_imageMap);
      return true;
    } catch (err) {
      // reject the promise on error
      logger.error(err);
      throw new Error(err);
    }
  };

  return {
    setCatalogObjects,
    catalogItems,
    catalogImageMap,
  };
};
