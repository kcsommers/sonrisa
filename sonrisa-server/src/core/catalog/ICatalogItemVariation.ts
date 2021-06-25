import { IMoney } from '../orders/IMoney';

export interface ICatalogItemVariation {
  item_id: string;

  name: string;

  price_money: IMoney;
}
