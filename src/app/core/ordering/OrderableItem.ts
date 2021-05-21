export interface IOrderableItem {
  name: string;

  images: string[];

  price: number;

  quantity: number;
}

export class OrderableItem implements IOrderableItem {
  constructor(
    public name: string,
    public images: string[],
    public price: number,
    public quantity = 0
  ) {}
}
