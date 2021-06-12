import { Document, model, Model, Schema } from 'mongoose';

export interface IOrderableItem extends Document {
  name: string;

  images: string[];

  price: number;

  description: string;

  outOfStock: boolean;
}

const orderableItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  outOfStock: {
    type: Boolean,
    required: true,
  },
});

const OrderableItem: Model<IOrderableItem> = model(
  'OrderableItem',
  orderableItemSchema
);

export default OrderableItem;
