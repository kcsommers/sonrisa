import { Schema } from '../schema';
/** Defines the valid parameters for requests to the `ListCustomerSegments` endpoint. */
export interface ListCustomerSegmentsRequest {
    /**
     * A pagination cursor returned by previous calls to `ListCustomerSegments`.
     * This cursor is used to retrieve the next set of query results.
     * For more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination).
     */
    cursor?: string;
}
export declare const listCustomerSegmentsRequestSchema: Schema<ListCustomerSegmentsRequest>;
