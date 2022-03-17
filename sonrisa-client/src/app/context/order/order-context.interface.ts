import { IOrderingStatus } from 'app/core';
import { Money, Order } from 'square';

export interface IOrderContext {
  order: Order;
  tipMoney: Money;
  orderingStatus: IOrderingStatus;
  setTipMoney: (tipMoney: Money) => void;
}
