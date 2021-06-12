import { Document, model, Model, Schema } from 'mongoose';
import { ICustomer } from './Customer';
import { IOrderableItem } from './OrderableItem';

export interface IOrder extends Document {
  customer: ICustomer['_id'];

  items: [
    {
      item: IOrderableItem['_id'];
      quantity: Number;
    }
  ];
}

const orderSchema: Schema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  items: {
    type: [
      {
        item: Schema.Types.ObjectId,
        quantity: Number,
      },
    ],
    required: true,
  },
});

const Order: Model<IOrder> = model('Order', orderSchema);

export default Order;
