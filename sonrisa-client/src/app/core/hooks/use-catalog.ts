import {
  useAppDispatch,
  useAppSelector,
  setCatalogImageMap,
  setMainCatalogItems,
  setSpecialsCatalogItems,
} from '@redux';
import { batch } from 'react-redux';
import { CatalogObject } from 'square';
import { Api } from '../api/api';
import { loadImages } from '../image-loader';
import { logger } from '../logger';

export interface ICatalogHook {
  setCatalogObjects: () => Promise<boolean>;

  mainCatalogItems: CatalogObject[];

  specialsCatalogItems: CatalogObject[];

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
    if (
      catalogState?.mainCatalogItems &&
      catalogState.mainCatalogItems.length
    ) {
      return true;
    }

    try {
      // get axios response and return the data property
      const _response = await Api.getCatalog();
      batch(() => {
        dispatch(setSpecialsCatalogItems(_response.data.specialsCatalogItems));
        dispatch(setMainCatalogItems(_response.data.mainCatalogItems));
        dispatch(setCatalogImageMap(_response.data.catalogImageMap));
      });

      // preload all images
      for (const id in _response.data.catalogImageMap) {
        loadImages(_response.data.catalogImageMap[id]);
      }
      logger.log('[get catalog response]:::: ', _response.data);
      return true;
    } catch (err) {
      // reject the promise on error
      logger.error(err);
      throw new Error(err);
    }
  };

  return {
    setCatalogObjects,
    mainCatalogItems: catalogState?.mainCatalogItems as CatalogObject[],
    specialsCatalogItems: catalogState?.specialsCatalogItems as CatalogObject[],
    catalogImageMap: catalogState?.catalogImageMap as {
      [imageId: string]: string[];
    },
  };
};
