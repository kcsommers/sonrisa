import { CatalogObject } from 'square';

export const calculateCost = (itemPrice: bigint, quantity: number): bigint => {
  return itemPrice * BigInt(quantity);
};

export const getMoneyString = (amount: bigint): string => {
  return `$${(Number(amount) / 100).toFixed(2)}`;
};

export const getItemPrice = (item: CatalogObject): bigint => {
  return (
    item.itemData?.variations?.[0].itemVariationData?.priceMoney?.amount ||
    BigInt(0)
  );
};

export const getItemVariationId = (item: CatalogObject): string => {
  return item.itemData?.variations?.[0].id || '';
};

export const getItemVariation = (
  item: CatalogObject
): CatalogObject | undefined => {
  return item.itemData?.variations?.[0];
};

export const getItemName = (item: CatalogObject): string => {
  return item.itemData?.name || '';
};
