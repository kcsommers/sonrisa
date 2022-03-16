import { Money, Order } from 'square';

export interface IOrderContext {
  order: Order;
  tipMoney: Money;
  setTipMoney: (tipMoney: Money) => void;
}
