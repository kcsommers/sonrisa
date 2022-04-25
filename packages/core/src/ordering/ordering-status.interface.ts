import { IPickupEvent } from '../events';

export interface IOrderingStatus {
  acceptingOrders: boolean;
  pickupEvent: IPickupEvent;
  message?: string;
  errors?: Error[];
  remainingItems?: number;
}
