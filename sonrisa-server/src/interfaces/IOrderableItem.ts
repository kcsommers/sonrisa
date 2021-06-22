export interface IOrderableItem extends Document {
  name: string;

  id: string;

  imageId: string;

  imageUrl: string;

  categoryId: string;

  price: number;

  description: string;
}
