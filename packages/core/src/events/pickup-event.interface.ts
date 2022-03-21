import { ILocation } from './location.interface';

export interface IPickupEvent {
  startTime: Date;
  endTime: Date;
  location: ILocation;
  _id?: string;
}
