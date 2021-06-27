export const calculateCost = (itemPrice: bigint, quantity: number): bigint => {
  return itemPrice * BigInt(quantity);
};

export const getMoneyString = (amount: bigint): string => {
  console.log('AMOUNT TYPE:::: ', typeof amount, amount);
  return `$${Number(amount / BigInt(100)).toFixed(2)}`;
};
