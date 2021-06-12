import { IOrderableItem } from './IOrderableItem.interface';

export const createOrderableItem = (
  name: string,
  images: string[],
  price: number,
  description: string
): IOrderableItem => {
  const id = Math.floor(Math.random() * 1000000);
  const quantity = 0;

  return {
    name,
    images,
    price,
    description,
    quantity,
    id,
  };
};
