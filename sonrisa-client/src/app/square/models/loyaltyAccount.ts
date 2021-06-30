import { Schema } from '../schema';
import { LoyaltyAccountMapping } from './loyaltyAccountMapping';
/**
 * Describes a loyalty account. For more information, see
 * [Loyalty Overview](https://developer.squareup.com/docs/loyalty/overview).
 */
export interface LoyaltyAccount {
    /** The Square-assigned ID of the loyalty account. */
    id?: string;
    /** The Square-assigned ID of the [loyalty program]($m/LoyaltyProgram) to which the account belongs. */
    programId: string;
    /**
     * The available point balance in the loyalty account.
     * Your application should be able to handle loyalty accounts that have a negative point balance (`balance` is less than 0). This might occur if a seller makes a manual adjustment or as a result of a refund or exchange.
     */
    balance?: number;
    /** The total points accrued during the lifetime of the account. */
    lifetimePoints?: number;
    /** The Square-assigned ID of the [customer]($m/Customer) that is associated with the account. */
    customerId?: string;
    /** The timestamp when enrollment occurred, in RFC 3339 format. */
    enrolledAt?: string;
    /** The timestamp when the loyalty account was created, in RFC 3339 format. */
    createdAt?: string;
    /** The timestamp when the loyalty account was last updated, in RFC 3339 format. */
    updatedAt?: string;
    /**
     * Represents the mapping that associates a loyalty account with a buyer.
     * Currently, a loyalty account can only be mapped to a buyer by phone number. For more information, see
     * [Loyalty Overview](https://developer.squareup.com/docs/loyalty/overview).
     */
    mapping?: LoyaltyAccountMapping;
}
export declare const loyaltyAccountSchema: Schema<LoyaltyAccount>;
