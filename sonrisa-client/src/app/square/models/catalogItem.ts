import { Schema } from '../schema';
import { CatalogItemModifierListInfo } from './catalogItemModifierListInfo';
import { CatalogItemOptionForItem } from './catalogItemOptionForItem';
import { CatalogObject } from './catalogObject';
/** A [CatalogObject]($m/CatalogObject) instance of the `ITEM` type, also referred to as an item, in the catalog. */
export interface CatalogItem {
  /** The item's name. This is a searchable attribute for use in applicable query filters, its value must not be empty, and the length is of Unicode code points. */
  name?: string;
  /** The item's description. This is a searchable attribute for use in applicable query filters, and its value length is of Unicode code points. */
  description?: string;
  /**
   * The text of the item's display label in the Square Point of Sale app. Only up to the first five characters of the string are used.
   * This attribute is searchable, and its value length is of Unicode code points.
   */
  abbreviation?: string;
  /** The color of the item's display label in the Square Point of Sale app. This must be a valid hex color code. */
  label_color?: string;
  /** If `true`, the item can be added to shipping orders from the merchant's online store. */
  available_online?: boolean;
  /** If `true`, the item can be added to pickup orders from the merchant's online store. */
  available_for_pickup?: boolean;
  /** If `true`, the item can be added to electronically fulfilled orders from the merchant's online store. */
  available_electronically?: boolean;
  /** The ID of the item's category, if any. */
  category_id?: string;
  /**
   * A set of IDs indicating the taxes enabled for
   * this item. When updating an item, any taxes listed here will be added to the item.
   * Taxes may also be added to or deleted from an item using `UpdateItemTaxes`.
   */
  tax_ids?: string[];
  /**
   * A set of `CatalogItemModifierListInfo` objects
   * representing the modifier lists that apply to this item, along with the overrides and min
   * and max limits that are specific to this item. Modifier lists
   * may also be added to or deleted from an item using `UpdateItemModifierLists`.
   */
  modifier_list_info?: CatalogItemModifierListInfo[];
  /**
   * A list of [CatalogItemVariation]($m/CatalogItemVariation) objects for this item. An item must have
   * at least one variation.
   */
  variations?: CatalogObject[];
  /** The type of a CatalogItem. Connect V2 only allows the creation of `REGULAR` or `APPOINTMENTS_SERVICE` items. */
  product_type?: string;
  /**
   * If `false`, the Square Point of Sale app will present the `CatalogItem`'s
   * details screen immediately, allowing the merchant to choose `CatalogModifier`s
   * before adding the item to the cart.  This is the default behavior.
   * If `true`, the Square Point of Sale app will immediately add the item to the cart with the pre-selected
   * modifiers, and merchants can edit modifiers by drilling down onto the item's details.
   * Third-party clients are encouraged to implement similar behaviors.
   */
  skip_modifier_screen?: boolean;
  /**
   * List of item options IDs for this item. Used to manage and group item
   * variations in a specified order.
   * Maximum: 6 item options.
   */
  item_options?: CatalogItemOptionForItem[];
  /**
   * A name to sort the item by. If this name is unspecified, namely, the `sort_name` field is absent, the regular `name` field is used for sorting.
   * It is currently supported for sellers of the Japanese locale only.
   */
  sort_name?: string;
}
export declare const catalogItemSchema: Schema<CatalogItem>;
