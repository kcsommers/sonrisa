import { IPickupEvent } from '@sonrisa/core';

export interface IOrderingStatus {
  acceptingOrders: boolean;
  pickupEvent: IPickupEvent;
  message?: string;
  errors?: Error[];
}
