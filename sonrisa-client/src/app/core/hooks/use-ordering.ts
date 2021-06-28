import { setOrder, useAppDispatch, useAppSelector } from '@redux';
import { cloneDeep } from 'lodash';
import { CatalogObject, Order, OrderLineItem } from 'square';
import { Api } from '../api/api';
import { logger } from '../logger';
import { getItemVariationId } from '../utils';
import { useStorage } from './use-storage';

export interface IOrderingHook {
  orderState: Order | undefined;

  getOrderId: () => string;

  getOrderById: (orderId: string) => Promise<Order>;

  getItemQuantity: (itemId: string) => number;

  setItemQuantity: (item: CatalogObject, quantity: number) => Promise<Order>;
}

export const useOrdering = (): IOrderingHook => {
  const orderState = useAppSelector((state) => state.order);

  const { setSessionItem, getSessionItem, storageKeys } = useStorage();

  const dispatch = useAppDispatch();

  const getOrderId = (): string => {
    const _orderId = getSessionItem(storageKeys.ORDER_NUMBER);
    return _orderId || '';
  };

  const getOrderById = async (orderId: string): Promise<Order> => {
    const _response = await Api.getOrder(orderId);
    return _response.data;
  };

  const getItemQuantity = (itemId: string): number => {
    if (
      !orderState ||
      !(orderState as any).line_items ||
      !(orderState as any).line_items.length
    ) {
      return 0;
    }

    const _item = (orderState as any).line_items.find(
      (item: any) => (item as any).catalog_object_id === itemId
    );
    if (!_item) {
      return 0;
    }

    return +_item.quantity;
  };

  const setItemQuantity = async (
    item: CatalogObject,
    quantity: number
  ): Promise<Order> => {
    // make a copy of the current order items
    const _clonedItems = cloneDeep((orderState as any)?.line_items || []);
    console.log('[cloned items]:::: ', orderState, _clonedItems);
    // look for the item being updated
    let _lineItem = _clonedItems.find((i: any) => {
      console.log('item:::: ', i.catalog_object_id, getItemVariationId(item));
      return i.catalog_object_id === getItemVariationId(item);
    });

    console.log('_LINE', _lineItem);

    // if it exists just update the quantity
    if (_lineItem) {
      _lineItem.quantity = String(quantity);
    } else {
      // otherwise create a new line item and push it into the items array
      _lineItem = {
        quantity: String(quantity),
        catalogObjectId: getItemVariationId(item),
      };

      _clonedItems?.push(_lineItem);
    }

    console.log('cloned items:::: ', _clonedItems);

    try {
      // if theres an existing id update the order
      // otherwise create a new one
      const _response = orderState?.id
        ? await Api.updateOrder(
            orderState?.id,
            orderState?.version || 0,
            _clonedItems
          )
        : await Api.createOrder(_clonedItems);

      setSessionItem(storageKeys.ORDER_NUMBER, _response.data.id);
      dispatch(setOrder(_response.data));
      return _response.data;
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  };

  return {
    orderState,
    getOrderId,
    getOrderById,
    getItemQuantity,
    setItemQuantity,
  };
};
