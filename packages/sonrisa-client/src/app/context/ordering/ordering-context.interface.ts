import { IOrderingStatus } from '@sonrisa/core';
import { CreatePaymentRequest, Customer, Money, Order, Payment } from 'square';

export interface IOrderContext {
  currentOrder: Order;
  tipMoney: Money;
  orderingStatus: IOrderingStatus;
  setTipMoney: (tipMoney: Money) => void;
  getItemQuantity: (itemId: string) => number;
  setItemQuantity: (itemId: string, quantity: number) => Promise<Order>;
  updateOrder: (data: any) => Promise<Order>;
  clearOrder: () => void;
  createPayment: (
    request: CreatePaymentRequest,
    customer: Customer
  ) => Promise<Payment>;
}
