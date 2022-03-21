import { ILocation } from './location.interface';

export interface IPickupEvent {
  startTime: Date;
  endTime: Date;
  location: ILocation;
  orders: string[];
  _id?: string;
}
