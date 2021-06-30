import { Schema } from '../schema';
import { AppointmentSegment } from './appointmentSegment';
/**
 * Represents a booking as a time-bound service contract for a seller's staff member to provide a specified service
 * at a given location to a requesting customer in one or more appointment segments.
 */
export interface Booking {
    /** A unique ID of this object representing a booking. */
    id?: string;
    /** The revision number for the booking used for optimistic concurrency. */
    version?: number;
    /** Supported booking statuses. */
    status?: string;
    /** The timestamp specifying the creation time of this booking, in RFC 3339 format. */
    createdAt?: string;
    /** The timestamp specifying the most recent update time of this booking, in RFC 3339 format. */
    updatedAt?: string;
    /** The timestamp specifying the starting time of this booking, in RFC 3339 format. */
    startAt?: string;
    /** The ID of the [Location]($m/Location) object representing the location where the booked service is provided. */
    locationId?: string;
    /** The ID of the [Customer]($m/Customer) object representing the customer attending this booking */
    customerId?: string;
    /** The free-text field for the customer to supply notes about the booking. For example, the note can be preferences that cannot be expressed by supported attributes of a relevant [CatalogObject]($m/CatalogObject) instance. */
    customerNote?: string;
    /**
     * The free-text field for the seller to supply notes about the booking. For example, the note can be preferences that cannot be expressed by supported attributes of a specific [CatalogObject]($m/CatalogObject) instance.
     * This field should not be visible to customers.
     */
    sellerNote?: string;
    /** A list of appointment segments for this booking. */
    appointmentSegments?: AppointmentSegment[];
}
export declare const bookingSchema: Schema<Booking>;