export interface IOrderableItem {
  name: string;

  images: string[];

  price: number;

  description: string;
}

export class OrderableItem implements IOrderableItem {
  constructor(
    public name: string,
    public images: string[],
    public price: number,
    public description: string
  ) {}
}
