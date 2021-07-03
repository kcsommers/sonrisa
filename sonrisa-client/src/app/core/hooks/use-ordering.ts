import { setOrder, useAppDispatch, useAppSelector } from '@redux';
import { cloneDeep } from 'lodash';
import { CatalogObject, Order } from 'square';
import { Api } from '../api/api';
import { logger } from '../logger';
import { getItemVariationId } from '../utils';
import { useStorage } from './use-storage';

export interface IOrderingHook {
  currentOrder: Order | undefined;

  getOrderId: () => string;

  getOrderById: (orderId: string) => Promise<Order>;

  getItemQuantity: (itemId: string) => number;

  setItemQuantity: (item: CatalogObject, quantity: number) => Promise<Order>;
}

export const useOrdering = (): IOrderingHook => {
  const currentOrder = useAppSelector((state) => state.order);

  const { setSessionItem, getSessionItem, storageKeys } = useStorage();

  const dispatch = useAppDispatch();

  const getOrderId = (): string => {
    const _orderId = getSessionItem(storageKeys.ORDER_NUMBER);
    return _orderId || '';
  };

  const getOrderById = async (orderId: string): Promise<Order> => {
    const _response = await Api.getOrder(orderId);
    return _response.data.order as Order;
  };

  const getItemQuantity = (itemId: string): number => {
    if (
      !currentOrder ||
      !currentOrder.lineItems ||
      !currentOrder.lineItems.length
    ) {
      return 0;
    }

    const _item = currentOrder.lineItems.find(
      (item) => item.catalogObjectId === itemId
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
    const _clonedItems = cloneDeep(currentOrder?.lineItems || []);
    // look for the item being updated
    let _lineItem = _clonedItems.find((i: any) => {
      return i.catalogObjectId === getItemVariationId(item);
    });

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

    try {
      // if theres an existing id update the order
      // otherwise create a new one
      const _response = currentOrder?.id
        ? await Api.updateOrder(currentOrder?.id, currentOrder?.version || 0, {
            lineItems: _clonedItems,
          })
        : await Api.createOrder(_clonedItems);

      const _order = _response.data.order as Order;

      setSessionItem(storageKeys.ORDER_NUMBER, _order.id);
      dispatch(setOrder(_order));
      return _order;
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  };

  return {
    currentOrder,
    getOrderId,
    getOrderById,
    getItemQuantity,
    setItemQuantity,
  };
};
