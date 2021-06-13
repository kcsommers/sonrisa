import { Document, model, Model, Schema } from 'mongoose';
import { ICustomer } from './Customer';
import { IOrderableItem } from './OrderableItem';

export interface IOrderItem extends Document {
  item: IOrderableItem['_id'];

  quantity: Number;
}

export interface IOrder extends Document {
  customer: ICustomer['_id'];

  items: [IOrderItem];
}

const orderSchema: Schema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  items: {
    type: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'OrderableItem',
        },
        quantity: Number,
      },
    ],
    required: true,
  },
});

const Order: Model<IOrder> = model('Order', orderSchema);

export default Order;
