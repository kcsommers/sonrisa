import { Schema } from '../schema';
import { AdditionalRecipient } from './additionalRecipient';
import { Money } from './money';
import { TenderCardDetails } from './tenderCardDetails';
import { TenderCashDetails } from './tenderCashDetails';
/** Represents a tender (i.e., a method of payment) used in a Square transaction. */
export interface Tender {
  /** The tender's unique ID. */
  id?: string;
  /** The ID of the transaction's associated location. */
  location_id?: string;
  /** The ID of the tender's associated transaction. */
  transaction_id?: string;
  /** The timestamp for when the tender was created, in RFC 3339 format. */
  created_at?: string;
  /** An optional note associated with the tender at the time of payment. */
  note?: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  amount_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  tip_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  processing_fee_money?: Money;
  /**
   * If the tender is associated with a customer or represents a customer's card on file,
   * this is the ID of the associated customer.
   */
  customer_id?: string;
  /** Indicates a tender's type. */
  type: string;
  /** Represents additional details of a tender with `type` `CARD` or `SQUARE_GIFT_CARD` */
  card_details?: TenderCardDetails;
  /** Represents the details of a tender with `type` `CASH`. */
  cash_details?: TenderCashDetails;
  /**
   * Additional recipients (other than the merchant) receiving a portion of this tender.
   * For example, fees assessed on the purchase by a third party integration.
   */
  additional_recipients?: AdditionalRecipient[];
  /**
   * The ID of the [Payment]($m/Payment) that corresponds to this tender.
   * This value is only present for payments created with the v2 Payments API.
   */
  payment_id?: string;
}
export declare const tenderSchema: Schema<Tender>;
