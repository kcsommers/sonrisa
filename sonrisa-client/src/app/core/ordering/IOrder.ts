import { IOrderItem } from './IOrderItem';

export interface IOrder {
  customer: string;

  items: IOrderItem[];

  _id: string;
}
