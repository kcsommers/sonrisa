import { Schema } from '../schema';
import { Customer } from './customer';
import { Error } from './error';
/**
 * Defines the fields that are included in the response body of
 * a request to the `SearchCustomers` endpoint.
 * Either `errors` or `customers` is present in a given response (never both).
 */
export interface SearchCustomersResponse {
    /** Any errors that occurred during the request. */
    errors?: Error[];
    /** An array of `Customer` objects that match a query. */
    customers?: Customer[];
    /**
     * A pagination cursor that can be used during subsequent calls
     * to `SearchCustomers` to retrieve the next set of results associated
     * with the original query. Pagination cursors are only present when
     * a request succeeds and additional results are available.
     * For more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination).
     */
    cursor?: string;
}
export declare const searchCustomersResponseSchema: Schema<SearchCustomersResponse>;
