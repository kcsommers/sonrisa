import { Schema } from '../schema';
/** A Square API V1 identifier of an item, including the object ID and its associated location ID. */
export interface CatalogV1Id {
  /** The ID for an object used in the Square API V1, if the object ID differs from the Square API V2 object ID. */
  catalog_v1_id?: string;
  /** The ID of the `Location` this Connect V1 ID is associated with. */
  location_id?: string;
}
export declare const catalogV1IdSchema: Schema<CatalogV1Id>;