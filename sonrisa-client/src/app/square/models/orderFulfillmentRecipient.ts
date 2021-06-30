import { Schema } from '../schema';
import { Address } from './address';
/** Contains information about the recipient of a fulfillment. */
export interface OrderFulfillmentRecipient {
  /**
   * The customer ID of the customer associated with the fulfillment.
   * If `customer_id` is provided, the fulfillment recipient's `display_name`,
   * `email_address`, and `phone_number` are automatically populated from the
   * targeted customer profile. If these fields are set in the request, the request
   * values overrides the information from the customer profile. If the
   * targeted customer profile does not contain the necessary information and
   * these fields are left unset, the request results in an error.
   */
  customer_id?: string;
  /**
   * The display name of the fulfillment recipient.
   * If provided, the display name overrides the value pulled from the customer profile indicated by `customer_id`.
   */
  display_name?: string;
  /**
   * The email address of the fulfillment recipient.
   * If provided, the email address overrides the value pulled from the customer profile indicated by `customer_id`.
   */
  email_address?: string;
  /**
   * The phone number of the fulfillment recipient.
   * If provided, the phone number overrides the value pulled from the customer profile indicated by `customer_id`.
   */
  phone_number?: string;
  /** Represents a physical address. */
  address?: Address;
}
export declare const orderFulfillmentRecipientSchema: Schema<OrderFulfillmentRecipient>;
