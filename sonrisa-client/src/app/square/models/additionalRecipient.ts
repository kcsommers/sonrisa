import { Schema } from '../schema';
import { Money } from './money';
/** Represents an additional recipient (other than the merchant) receiving a portion of this tender. */
export interface AdditionalRecipient {
  /** The location ID for a recipient (other than the merchant) receiving a portion of this tender. */
  location_id: string;
  /** The description of the additional recipient. */
  description?: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  amount_money: Money;
  /** The unique ID for this [AdditionalRecipientReceivable]($m/AdditionalRecipientReceivable), assigned by the server. */
  receivable_id?: string;
}
export declare const additionalRecipientSchema: Schema<AdditionalRecipient>;
