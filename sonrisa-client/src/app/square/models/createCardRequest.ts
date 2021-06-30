import { Schema } from '../schema';
import { Card } from './card';
/**
 * Creates a card from the source (nonce, payment id, etc). Accessible via
 * HTTP requests at POST https://connect.squareup.com/v2/cards
 */
export interface CreateCardRequest {
    /**
     * A unique string that identifies this CreateCard request. Keys can be
     * any valid string and must be unique for every request.
     * Max: 45 characters
     * See [Idempotency keys](https://developer.squareup.com/docs/basics/api101/idempotency) for more information.
     */
    idempotencyKey: string;
    /** The ID of the source which represents the card information to be stored. This can be a card nonce or a payment id. */
    sourceId: string;
    /**
     * An identifying token generated by [Payments.verifyBuyer()](https://developer.squareup.com/reference/sdks/web/payments/objects/Payments#Payments.verifyBuyer).
     * Verification tokens encapsulate customer device information and 3-D Secure
     * challenge results to indicate that Square has verified the buyer identity.
     * See the [SCA Overview](https://developer.squareup.com/docs/sca-overview).
     */
    verificationToken?: string;
    /**
     * Represents the payment details of a card to be used for payments. These
     * details are determined by the payment token generated by Web Payments SDK.
     */
    card: Card;
}
export declare const createCardRequestSchema: Schema<CreateCardRequest>;
