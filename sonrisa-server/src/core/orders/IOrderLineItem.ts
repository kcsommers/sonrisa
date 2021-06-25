import { IMoney } from './IMoney';

export interface IOrderLineItem {
  uid: string;

  name: string;

  quantity: string;

  catalog_object_id: string;

  total_money: IMoney;

  base_price_money: IMoney;

  total_tax_money: IMoney;
}
