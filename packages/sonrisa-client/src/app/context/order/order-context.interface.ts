import { IOrderingStatus } from '@sonrisa/core';
import { Money, Order } from 'square';

export interface IOrderContext {
  order: Order;
  tipMoney: Money;
  orderingStatus: IOrderingStatus;
  setTipMoney: (tipMoney: Money) => void;
}
