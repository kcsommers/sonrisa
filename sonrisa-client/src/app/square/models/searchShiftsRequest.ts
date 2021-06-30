import { Schema } from '../schema';
import { ShiftQuery } from './shiftQuery';
/** A request for a filtered and sorted set of `Shift` objects. */
export interface SearchShiftsRequest {
    /** The parameters of a `Shift` search query. Includes filter and sort options. */
    query?: ShiftQuery;
    /** number of resources in a page (200 by default). */
    limit?: number;
    /** opaque cursor for fetching the next page. */
    cursor?: string;
}
export declare const searchShiftsRequestSchema: Schema<SearchShiftsRequest>;
