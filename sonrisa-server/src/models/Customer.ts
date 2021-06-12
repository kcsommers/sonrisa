import { Document, Model, model, Schema } from 'mongoose';

export interface ICustomer extends Document {
  name: string;

  email: string;

  phoneNumber: string;
}

const customerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
  },
});

const User: Model<ICustomer> = model('Customer', customerSchema);

export default User;
