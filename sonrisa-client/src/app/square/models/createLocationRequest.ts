import { Schema } from '../schema';
import { Location } from './location';
/** Request object for the [CreateLocation]($e/Locations/CreateLocation) endpoint. */
export interface CreateLocationRequest {
    location?: Location;
}
export declare const createLocationRequestSchema: Schema<CreateLocationRequest>;
