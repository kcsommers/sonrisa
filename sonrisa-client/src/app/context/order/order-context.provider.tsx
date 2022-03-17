import { IOrderingStatus } from '../../core/orders';
import { useEffect, useState } from 'react';
import { Money, Order } from 'square';
import { ORDER_CONTEXT } from './order.context';
import { Api, logger } from '@core';

export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState<Order>({} as Order);

  const [orderingStatus, setOrderingStatus] = useState<IOrderingStatus>(
    {} as IOrderingStatus
  );

  useEffect(() => {
    const checkAcceptingOrders = async () => {
      try {
        const _response = await Api.acceptingOrders();
        logger.log('[acceptingOrders response]:::: ', _response);
        setOrderingStatus(_response.data);
      } catch (err: any) {
        logger.error(err);
        setOrderingStatus({
          acceptingOrders: false,
          message:
            'There was an unexpected error. Please refresh the page to try again.',
        });
      }
    };
    checkAcceptingOrders();
  }, []);

  const [tipMoney, setTipMoney] = useState<Money>({
    amount: 0,
    currency: 'USD',
  } as any);

  return (
    <ORDER_CONTEXT.Provider
      value={{ order, tipMoney, orderingStatus, setTipMoney }}
    >
      {children}
    </ORDER_CONTEXT.Provider>
  );
};
