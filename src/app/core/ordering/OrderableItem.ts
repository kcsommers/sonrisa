export interface IOrderableItem {
  name: string;

  images: string[];

  price: number;

  description: string;

  quantity: number;

  id: number;
}

export class OrderableItem implements IOrderableItem {
  public quantity = 0;

  public id = Math.floor(Math.random() * 1000000);

  constructor(
    public name: string,
    public images: string[],
    public price: number,
    public description: string
  ) {}

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }
}
