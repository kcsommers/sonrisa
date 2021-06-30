import { Schema } from '../schema';
/** Specific details for curbside pickup. */
export interface OrderFulfillmentPickupDetailsCurbsidePickupDetails {
  /** Specific details for curbside pickup, such as parking number and vehicle model. */
  curbside_details?: string;
  /**
   * The [timestamp](https://developer.squareup.com/docs/build-basics/working-with-dates)
   * indicating when the buyer arrived and is waiting for pickup. The timestamp must be in RFC 3339 format
   * (for example, "2016-09-04T23:59:33.123Z").
   */
  buyer_arrived_at?: string;
}
export declare const orderFulfillmentPickupDetailsCurbsidePickupDetailsSchema: Schema<OrderFulfillmentPickupDetailsCurbsidePickupDetails>;
