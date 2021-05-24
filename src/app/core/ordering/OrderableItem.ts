export interface IOrderableItem {
  name: string;

  images: string[];

  price: number;

  description: string;

  quantity: number;

  id: number;
}

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
