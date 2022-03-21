import { IPickupEvent } from '@sonrisa/core';
import { model, Schema } from 'mongoose';

const pickupEventSchema = new Schema<any, IPickupEvent>({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
  orders: {
    type: [String],
  },
});

export const PickupEventModel = model<IPickupEvent>(
  'PickupEvent',
  pickupEventSchema
);
