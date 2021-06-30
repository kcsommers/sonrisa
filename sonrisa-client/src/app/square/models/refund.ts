import { Schema } from '../schema';
import { AdditionalRecipient } from './additionalRecipient';
import { Money } from './money';
/** Represents a refund processed for a Square transaction. */
export interface Refund {
  /** The refund's unique ID. */
  id: string;
  /** The ID of the refund's associated location. */
  location_id: string;
  /** The ID of the transaction that the refunded tender is part of. */
  transaction_id: string;
  /** The ID of the refunded tender. */
  tender_id: string;
  /** The timestamp for when the refund was created, in RFC 3339 format. */
  created_at?: string;
  /** The reason for the refund being issued. */
  reason: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  amount_money: Money;
  /** Indicates a refund's current status. */
  status: string;
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
   * Additional recipients (other than the merchant) receiving a portion of this refund.
   * For example, fees assessed on a refund of a purchase by a third party integration.
   */
  additional_recipients?: AdditionalRecipient[];
}
export declare const refundSchema: Schema<Refund>;
