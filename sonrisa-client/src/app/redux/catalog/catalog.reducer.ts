import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { CatalogObject } from 'square';
import {
  SET_CATALOG_IMAGE_MAP,
  SET_MAIN_CATALOG_ITEMS,
  SET_SPECIALS_CATALOG_ITEMS,
} from './catalog.actions';

interface ICatalogState {
  catalogImageMap: { [imageId: string]: string[] };

  mainCatalogItems: CatalogObject[];

  specialsCatalogItems: CatalogObject[];
}

const initialState: ICatalogState = {
  catalogImageMap: {},

  mainCatalogItems: [],

  specialsCatalogItems: [],
};

export const catalogReducer: Reducer<ICatalogState | undefined, AnyAction> = (
  state = initialState,
  action
): ICatalogState => {
  switch (action.type) {
    case SET_CATALOG_IMAGE_MAP: {
      const _clonedState = cloneDeep(state);
      _clonedState.catalogImageMap = action.imageMap;
      return _clonedState;
    }

    case SET_MAIN_CATALOG_ITEMS: {
      const _clonedState = cloneDeep(state);
      _clonedState.mainCatalogItems = action.items;
      return _clonedState;
    }

    case SET_SPECIALS_CATALOG_ITEMS: {
      const _clonedState = cloneDeep(state);
      _clonedState.specialsCatalogItems = action.items;
      return _clonedState;
    }

    default:
      return state;
  }
};
