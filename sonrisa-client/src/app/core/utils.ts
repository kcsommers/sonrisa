import { CatalogObject } from 'square';

export const calculateCost = (itemPrice: string, quantity: number): number => {
  return quantity * +itemPrice;
};

export const getMoneyString = (amount: number): string => {
  return `$${(amount / 100).toFixed(2)}`;
};

export const getItemPrice = (item: CatalogObject): string => {
  return (
    (item.itemData?.variations?.[0].itemVariationData?.priceMoney
      ?.amount as string) || '0'
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

export const getItemDescription = (item: CatalogObject): string => {
  return item.itemData?.description || '';
};

export const getColor = (colorType: string): string => {
  const _colorMap: any = {
    success: '#22bc33',
    error: '#bb2224',
  };

  return _colorMap[colorType] || colorType;
};
