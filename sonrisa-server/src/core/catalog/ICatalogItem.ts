import { ICatalogItemVariation } from './ICatalogItemVariation';

export interface ICatalogItem {
  available_for_pickup: boolean;

  category_id: string;

  description: string;

  name: string;

  tax_ids: string[];

  variations: ICatalogItemVariation[];
}
