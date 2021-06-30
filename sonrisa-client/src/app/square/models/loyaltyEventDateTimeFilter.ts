import { Schema } from '../schema';
import { TimeRange } from './timeRange';
/** Filter events by date time range. */
export interface LoyaltyEventDateTimeFilter {
    /**
     * Represents a generic time range. The start and end values are
     * represented in RFC 3339 format. Time ranges are customized to be
     * inclusive or exclusive based on the needs of a particular endpoint.
     * Refer to the relevant endpoint-specific documentation to determine
     * how time ranges are handled.
     */
    createdAt: TimeRange;
}
export declare const loyaltyEventDateTimeFilterSchema: Schema<LoyaltyEventDateTimeFilter>;
