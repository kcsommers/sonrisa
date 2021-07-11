import { setOrder, useAppDispatch, useAppSelector } from '@redux';
import { cloneDeep } from 'lodash';
import { CreatePaymentRequest, Customer, Order, Payment } from 'square';
import { Api } from '../api/api';
import { logger } from '../logger';
import { useStorage } from './use-storage';

export interface IOrderingHook {
  currentOrder: Order | undefined;

  getOrderId: () => string;

  getOrderById: (orderId: string) => Promise<Order>;

  getItemQuantity: (itemId: string) => number;

  setItemQuantity: (itemId: string, quantity: number) => Promise<Order>;

  updateOrder: (data: any) => Promise<Order>;

  clearOrder: () => void;

  createPayment: (
    request: CreatePaymentRequest,
    customer: Customer
  ) => Promise<Payment>;
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

  const updateOrder = async (data: any): Promise<Order> => {
    try {
      const _response = await Api.updateOrder(
        currentOrder?.id as string,
        currentOrder?.version as number,
        data
      );

      const _order = _response.data.order as Order;

      setSessionItem(storageKeys.ORDER_NUMBER, _order.id);
      dispatch(setOrder(_order));
      return _order;
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  };

  const setItemQuantity = async (
    itemId: string,
    quantity: number
  ): Promise<Order> => {
    // make a copy of the current order items
    const _clonedItems = cloneDeep(currentOrder?.lineItems || []);
    // look for the item being updated
    let _lineItem = _clonedItems.find((i: any) => {
      return i.catalogObjectId === itemId;
    });

    // quantity is zero, redirect to update order with fieldsToClear array
    if (quantity === 0) {
      return updateOrder({
        fieldsToClear: [`line_items[${_lineItem?.uid}]`],
      });
    }

    // if it exists just update the quantity
    if (_lineItem) {
      _lineItem.quantity = String(quantity);
    } else {
      // otherwise create a new line item and push it into the items array
      _lineItem = {
        quantity: String(quantity),
        catalogObjectId: itemId,
      };

      _clonedItems?.push(_lineItem);
    }

    try {
      // if theres an existing id update the order
      // otherwise create a new one
      const _response = currentOrder?.id
        ? await Api.updateOrder(currentOrder.id, currentOrder?.version || 0, {
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

  const clearOrder = () => {
    dispatch(setOrder(null));
    setSessionItem(storageKeys.ORDER_NUMBER, '');
  };

  const createPayment = async (
    request: CreatePaymentRequest,
    customer: Customer
  ): Promise<Payment> => {
    try {
      const _response = await Api.createPayment(request, customer);
      const _payment = _response.data.payment as Payment;

      return _payment;
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
    updateOrder,
    clearOrder,
    createPayment,
  };
};
