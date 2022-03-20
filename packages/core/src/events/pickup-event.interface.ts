import { ILocation } from './location.interface';

export interface IPickupEvent {
  startTime: number;
  location: ILocation;
  _id?: string;
}
