import { Schema } from '../schema';
import { Error } from './error';
export interface BatchDeleteCatalogObjectsResponse {
    /** Any errors that occurred during the request. */
    errors?: Error[];
    /** The IDs of all CatalogObjects deleted by this request. */
    deletedObjectIds?: string[];
    /** The database [timestamp](https://developer.squareup.com/docs/build-basics/working-with-dates) of this deletion in RFC 3339 format, e.g., "2016-09-04T23:59:33.123Z". */
    deletedAt?: string;
}
export declare const batchDeleteCatalogObjectsResponseSchema: Schema<BatchDeleteCatalogObjectsResponse>;
