import { IOrderingStatus } from '@sonrisa/core';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CreatePaymentRequest, Customer, Money, Order, Payment } from 'square';
import { useStorage } from '../../hooks/use-storage';
import { Api } from '../../sonrisa-api/api';
import { logger } from '../../utils';
import { ORDER_CONTEXT } from './ordering.context';

export const OrderContextProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState<Order>({} as Order);
  const [orderingStatus, setOrderingStatus] = useState<IOrderingStatus>({
    acceptingOrders: true,
    message: '',
    pickupEvent: null,
  });

  const { setSessionItem, getSessionItem, storageKeys } = useStorage();
  const router = useRouter();

  const [tipMoney, setTipMoney] = useState<Money>({
    amount: 0,
    currency: 'USD',
  } as any);

  const getOrderById = async (orderId: string): Promise<Order> => {
    const _response = await Api.getOrder(orderId);
    return _response.data.order as Order;
  };

  useEffect(() => {
    const orderId = getSessionItem(storageKeys.ORDER_NUMBER);
    if (!orderId) {
      return;
    }
    getOrderById(orderId)
      .then((order) => setCurrentOrder(order))
      .catch((err) => console.error(err));
  }, []);

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
      setCurrentOrder(_order);
      return _order;
    } catch (err: any) {
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
      const response = currentOrder?.id
        ? await Api.updateOrder(currentOrder.id, currentOrder?.version || 0, {
            lineItems: _clonedItems,
            pickupEvent: orderingStatus.pickupEvent,
          })
        : await Api.createOrder(_clonedItems, orderingStatus.pickupEvent);

      const _order = response.data.order as Order;

      setSessionItem(storageKeys.ORDER_NUMBER, _order.id);
      setCurrentOrder(_order);
      return _order;
    } catch (err: any) {
      logger.error(err);
      throw new Error(err);
    }
  };

  const clearOrder = () => {
    setCurrentOrder(null);
    setSessionItem(storageKeys.ORDER_NUMBER, '');
  };

  const createPayment = async (
    request: CreatePaymentRequest,
    customer: Customer
  ): Promise<Payment> => {
    try {
      const response = await Api.createPayment(
        request,
        customer,
        orderingStatus.pickupEvent
      );
      const payment = response.data.payment as Payment;

      return payment;
    } catch (err: any) {
      logger.error(err);
      throw new Error(err);
    }
  };

  useEffect(() => {
    const checkAcceptingOrders = async () => {
      try {
        const _response = await Api.acceptingOrders();
        logger.log('[acceptingOrders response]:::: ', _response);
        setOrderingStatus(_response.data);
      } catch (err: any) {
        logger.error(err);
        setOrderingStatus({
          pickupEvent: null,
          acceptingOrders: false,
          message:
            'There was an unexpected error. Please refresh the page to try again.',
        });
      }
    };
    checkAcceptingOrders();
  }, [router.pathname]);

  return (
    <ORDER_CONTEXT.Provider
      value={{
        currentOrder,
        tipMoney,
        orderingStatus,
        setTipMoney,
        getItemQuantity,
        setItemQuantity,
        updateOrder,
        clearOrder,
        createPayment,
        setOrderingStatus,
      }}
    >
      {children}
    </ORDER_CONTEXT.Provider>
  );
};
