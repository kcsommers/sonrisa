import {
  useAppDispatch,
  useAppSelector,
  setCatalogImageMap,
  setCatalogItems,
} from '@redux';
import { batch } from 'react-redux';
import { CatalogObject } from 'square';

import { Api } from '../api/api';
import { logger } from '../logger';

export interface ICatalogHook {
  setCatalogObjects: () => Promise<boolean>;

  catalogItems: CatalogObject[];

  catalogImageMap: { [imageId: string]: string[] }; // <imageId, imgUrl>
}

export const useCatalog = (): ICatalogHook => {
  const catalogState = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();

  /**
   * Fetches and sets the entire square catalog if it hasn't already been done
   * @returns Promise<boolean>
   */
  const setCatalogObjects = async (): Promise<boolean> => {
    // check cache and resolve promise if present
    if (catalogState?.catalogItems && catalogState.catalogItems.length) {
      return true;
    }

    try {
      // get axios response and return the data property
      const _response = await Api.getCatalog();

      batch(() => {
        dispatch(setCatalogItems(_response.data.catalogItems));
        dispatch(setCatalogImageMap(_response.data.catalogImageMap));
      });

      logger.log('get catalog response:::: ', _response.data);
      return true;
    } catch (err) {
      // reject the promise on error
      logger.error(err);
      throw new Error(err);
    }
  };

  return {
    setCatalogObjects,
    catalogItems: catalogState?.catalogItems as CatalogObject[],
    catalogImageMap: catalogState?.catalogImageMap as {
      [imageId: string]: string[];
    },
  };
};

// // if its a catalog item add it to the array
// if (catalogObject.type === CatalogObjectTypes.ITEM) {
//   // the price needs to be converted from a string to bigint
//   // in this very gross way
//   if (
//     catalogObject.itemData?.variations?.[0]?.itemVariationData
//       ?.priceMoney
//   ) {
//     catalogObject.itemData.variations[0].itemVariationData.priceMoney.amount =
//       BigInt(
//         catalogObject.itemData?.variations?.[0]?.itemVariationData
//           ?.priceMoney?.amount ?? 0
//       );
//   }
