import { cloneDeep } from 'lodash';
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { CatalogObject } from 'square';
import { SET_CATALOG_IMAGE_MAP, SET_CATALOG_ITEMS } from './catalog.actions';

interface ICatalogState {
  catalogImageMap: { [imageId: string]: string[] };

  catalogItems: CatalogObject[];
}

const initialState: ICatalogState = {
  catalogImageMap: {},

  catalogItems: [],
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

    case SET_CATALOG_ITEMS: {
      const _clonedState = cloneDeep(state);
      _clonedState.catalogItems = action.items;
      return _clonedState;
    }
    default:
      return state;
  }
};
