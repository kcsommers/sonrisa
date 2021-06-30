import { Schema } from '../schema';
import { CatalogModifierOverride } from './catalogModifierOverride';
/** Options to control the properties of a `CatalogModifierList` applied to a `CatalogItem` instance. */
export interface CatalogItemModifierListInfo {
  /** The ID of the `CatalogModifierList` controlled by this `CatalogModifierListInfo`. */
  modifier_list_id: string;
  /** A set of `CatalogModifierOverride` objects that override whether a given `CatalogModifier` is enabled by default. */
  modifier_overrides?: CatalogModifierOverride[];
  /** If 0 or larger, the smallest number of `CatalogModifier`s that must be selected from this `CatalogModifierList`. */
  minSelected_modifiers?: number;
  /** If 0 or larger, the largest number of `CatalogModifier`s that can be selected from this `CatalogModifierList`. */
  maxSelected_modifiers?: number;
  /** If `true`, enable this `CatalogModifierList`. The default value is `true`. */
  enabled?: boolean;
}
export declare const catalogItemModifierListInfoSchema: Schema<CatalogItemModifierListInfo>;
