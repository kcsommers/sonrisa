import { IPickupEvent } from '@sonrisa/core';
import { model, Schema } from 'mongoose';

const pickupEventSchema = new Schema<any, IPickupEvent>({
  startTime: {
    type: Number,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
});

export const PickupEventModel = model<IPickupEvent>(
  'PickupEvent',
  pickupEventSchema
);
