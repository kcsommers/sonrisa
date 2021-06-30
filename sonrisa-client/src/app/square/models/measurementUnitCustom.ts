import { Schema } from '../schema';
/** The information needed to define a custom unit, provided by the seller. */
export interface MeasurementUnitCustom {
    /** The name of the custom unit, for example "bushel". */
    name: string;
    /**
     * The abbreviation of the custom unit, such as "bsh" (bushel). This appears
     * in the cart for the Point of Sale app, and in reports.
     */
    abbreviation: string;
}
export declare const measurementUnitCustomSchema: Schema<MeasurementUnitCustom>;
