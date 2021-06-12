import { Document, model, Model, Schema } from 'mongoose';
import { IOrderableItem } from '../interfaces/IOrderableItem';
import { ICustomer } from './Customer';

export interface IOrder extends Document {
  customer: ICustomer['_id'];

  items: IOrderableItem[];

  orderNumber: string;
}

const orderSchema: Schema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  items: {
    type: [],
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const Order: Model<IOrder> = model('Order', orderSchema);

export default Order;
