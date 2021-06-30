import { Schema } from '../schema';
import { CustomerGroup } from './customerGroup';
/**
 * Defines the body parameters that can be included in a request to the
 * [CreateCustomerGroup]($e/CustomerGroups/CreateCustomerGroup) endpoint.
 */
export interface CreateCustomerGroupRequest {
    /** The idempotency key for the request. For more information, see [Idempotency](https://developer.squareup.com/docs/basics/api101/idempotency). */
    idempotencyKey?: string;
    /**
     * Represents a group of customer profiles.
     * Customer groups can be created, be modified, and have their membership defined using
     * the Customers API or within the Customer Directory in the Square Seller Dashboard or Point of Sale.
     */
    group: CustomerGroup;
}
export declare const createCustomerGroupRequestSchema: Schema<CreateCustomerGroupRequest>;