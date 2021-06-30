import { Schema } from '../schema';
import { DisputedPayment } from './disputedPayment';
import { Money } from './money';
/** Represents a dispute a cardholder initiated with their bank. */
export interface Dispute {
    /** The unique ID for this `Dispute`, generated by Square. */
    disputeId?: string;
    /** The unique ID for this `Dispute`, generated by Square. */
    id?: string;
    /**
     * Represents an amount of money. `Money` fields can be signed or unsigned.
     * Fields that do not explicitly define whether they are signed or unsigned are
     * considered unsigned and can only hold positive amounts. For signed fields, the
     * sign of the value indicates the purpose of the money transfer. See
     * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
     * for more information.
     */
    amountMoney?: Money;
    /**
     * The list of possible reasons why a cardholder might initiate a
     * dispute with their bank.
     */
    reason?: string;
    /** The list of possible dispute states. */
    state?: string;
    /** The time when the next action is due, in RFC 3339 format. */
    dueAt?: string;
    /** The payment the cardholder disputed. */
    disputedPayment?: DisputedPayment;
    /** The IDs of the evidence associated with the dispute. */
    evidenceIds?: string[];
    /** Indicates a card's brand, such as `VISA` or `MASTERCARD`. */
    cardBrand?: string;
    /** The timestamp when the dispute was created, in RFC 3339 format. */
    createdAt?: string;
    /** The timestamp when the dispute was last updated, in RFC 3339 format. */
    updatedAt?: string;
    /** The ID of the dispute in the card brand system, generated by the card brand. */
    brandDisputeId?: string;
    /** The timestamp when the dispute was reported, in RFC 3339 format. */
    reportedDate?: string;
    /** The timestamp when the dispute was reported, in RFC 3339 format. */
    reportedAt?: string;
    /** The current version of the `Dispute`. */
    version?: number;
    /** The ID of the location where the dispute originated. */
    locationId?: string;
}
export declare const disputeSchema: Schema<Dispute>;
