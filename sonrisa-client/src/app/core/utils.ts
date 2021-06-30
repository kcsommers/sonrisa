import { CatalogObject } from '@square';

export const calculateCost = (itemPrice: bigint, quantity: number): bigint => {
  return itemPrice * BigInt(quantity);
};

export const getMoneyString = (amount: bigint): string => {
  return `$${(Number(amount) / 100).toFixed(2)}`;
};

export const getItemPrice = (item: CatalogObject): bigint => {
  return (
    item.item_data?.variations?.[0].item_variation_data?.price_money?.amount ||
    BigInt(0)
  );
};

export const getItemVariationId = (item: CatalogObject): string => {
  return item.item_data?.variations?.[0].id || '';
};

export const getItemVariation = (
  item: CatalogObject
): CatalogObject | undefined => {
  return item.item_data?.variations?.[0];
};

export const getItemName = (item: CatalogObject): string => {
  return item.item_data?.name || '';
};
