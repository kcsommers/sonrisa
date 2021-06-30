import { Schema } from '../schema';
import { Address } from './address';
/**
 * Defines the body parameters that can be included in a request to the
 * `UpdateCustomer` endpoint.
 */
export interface UpdateCustomerRequest {
    /** The given name (that is, the first name) associated with the customer profile. */
    givenName?: string;
    /** The family name (that is, the last name) associated with the customer profile. */
    familyName?: string;
    /** A business name associated with the customer profile. */
    companyName?: string;
    /** A nickname for the customer profile. */
    nickname?: string;
    /** The email address associated with the customer profile. */
    emailAddress?: string;
    /** Represents a physical address. */
    address?: Address;
    /** The 11-digit phone number associated with the customer profile. */
    phoneNumber?: string;
    /**
     * An optional second ID used to associate the customer profile with an
     * entity in another system.
     */
    referenceId?: string;
    /** A custom note associated with the customer profile. */
    note?: string;
    /**
     * The birthday associated with the customer profile, in RFC 3339 format. The year is optional. The timezone and time are not allowed.
     * For example, `0000-09-21T00:00:00-00:00` represents a birthday on September 21 and `1998-09-21T00:00:00-00:00` represents a birthday on September 21, 1998.
     * You can also specify this value in `YYYY-MM-DD` format.
     */
    birthday?: string;
    /**
     * The current version of the customer profile.
     * As a best practice, you should include this field to enable [optimistic concurrency](https://developer.squareup.com/docs/working-with-apis/optimistic-concurrency) control. For more information, see [Update a customer profile](https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#update-a-customer-profile).
     */
    version?: bigint;
}
export declare const updateCustomerRequestSchema: Schema<UpdateCustomerRequest>;
