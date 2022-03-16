import { useState } from 'react';
import { Money, Order } from 'square';
import { ORDER_CONTEXT } from './order.context';

export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState<Order>({} as Order);

  const [tipMoney, setTipMoney] = useState<Money>({
    amount: 0,
    currency: 'USD',
  } as any);

  return (
    <ORDER_CONTEXT.Provider value={{ order, tipMoney, setTipMoney }}>
      {children}
    </ORDER_CONTEXT.Provider>
  );
};
