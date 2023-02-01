import { CatalogObject, Money, Order } from 'square';

export const calculateCost = (itemPrice: string, quantity: number): number => {
  return quantity * +itemPrice;
};

export const getMoneyString = (amount: number): string => {
  return `$${(amount / 100).toFixed(2)}`;
};

export const getItemPrice = (item: CatalogObject): string => {
  return (
    // @ts-ignore
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

export const getColor = (colorType: string, rgb = false): string => {
  const _colorMap: any = {
    success: '#22bc33',
    error: '#cc0023',
    yellow: rgb ? '248, 248, 186' : '#f8f8ba',
    offwhite: rgb ? '241, 241, 241' : '#f1f1f1',
    dark: rgb ? '87, 63, 8' : '#573f08',
  };

  return _colorMap[colorType] || colorType;
};

export const getOrderSubtotal = (order: Order): number => {
  // @ts-ignore
  const _tax = +(order.totalTaxMoney?.amount as string);
  // @ts-ignore
  const _total = +(order.totalMoney?.amount as string);

  return _total - _tax;
};

export const getOrderTotal = (order: Order, tip?: Money): number => {
  // @ts-ignore
  const subTotal = +(order.totalMoney?.amount as string);
  const tipTotal = +(tip?.amount as unknown as string) || 0;
  return subTotal + tipTotal;
};

export const getOrderTip = (order: Order): number => {
  // @ts-ignore
  return +(order.totalTipMoney?.amount as string);
};

export const getOrderTax = (order: Order): number => {
  // @ts-ignore
  return +(order.totalTaxMoney?.amount as string);
};

export const getPickupTime = (): string => {
  const _today = new Date();
  const _nextweek = new Date(
    _today.getFullYear(),
    _today.getMonth(),
    _today.getDate() + 7
  );

  return _nextweek.toISOString();
};

export const toTitleCase = (str: string) => {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
