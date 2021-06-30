import { Schema } from '../schema';
import { Error } from './error';
import { Shift } from './shift';
/**
 * The response to a request for `Shift` objects. Contains
 * the requested `Shift` objects. May contain a set of `Error` objects if
 * the request resulted in errors.
 */
export interface SearchShiftsResponse {
    /** Shifts */
    shifts?: Shift[];
    /** Opaque cursor for fetching the next page. */
    cursor?: string;
    /** Any errors that occurred during the request. */
    errors?: Error[];
}
export declare const searchShiftsResponseSchema: Schema<SearchShiftsResponse>;
