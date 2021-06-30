import { Schema } from '../schema';
/** Options to control how to override the default behavior of the specified modifier. */
export interface CatalogModifierOverride {
  /** The ID of the `CatalogModifier` whose default behavior is being overridden. */
  modifier_id: string;
  /** If `true`, this `CatalogModifier` should be selected by default for this `CatalogItem`. */
  on_by_default?: boolean;
}
export declare const catalogModifierOverrideSchema: Schema<CatalogModifierOverride>;
