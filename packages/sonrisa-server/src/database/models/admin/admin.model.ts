import { IAdmin } from '@sonrisa/core';
import { model, Schema } from 'mongoose';

const adminSchema = new Schema<any, IAdmin>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

export const AdminModel = model<IAdmin>('Admin', adminSchema);
