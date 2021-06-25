import { IMoney } from './IMoney';
import { IOrderLineItem } from './IOrderLineItem';

export interface IOrder {
  id: string;

  location_id: string;

  customer_id?: string;

  line_items: IOrderLineItem[];

  state: string;

  total_money: IMoney;

  total_tax_money: IMoney;

  total_tip_money: IMoney;
}
