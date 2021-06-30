import { Schema } from '../schema';
import { CatalogCategory } from './catalogCategory';
import { CatalogCustomAttributeDefinition } from './catalogCustomAttributeDefinition';
import { CatalogCustomAttributeValue } from './catalogCustomAttributeValue';
import { CatalogDiscount } from './catalogDiscount';
import { CatalogImage } from './catalogImage';
import { CatalogItem } from './catalogItem';
import { CatalogItemOption } from './catalogItemOption';
import { CatalogItemOptionValue } from './catalogItemOptionValue';
import { CatalogItemVariation } from './catalogItemVariation';
import { CatalogMeasurementUnit } from './catalogMeasurementUnit';
import { CatalogModifier } from './catalogModifier';
import { CatalogModifierList } from './catalogModifierList';
import { CatalogPricingRule } from './catalogPricingRule';
import { CatalogProductSet } from './catalogProductSet';
import { CatalogQuickAmountsSettings } from './catalogQuickAmountsSettings';
import { CatalogSubscriptionPlan } from './catalogSubscriptionPlan';
import { CatalogTax } from './catalogTax';
import { CatalogTimePeriod } from './catalogTimePeriod';
import { CatalogV1Id } from './catalogV1Id';
/**
 * The wrapper object for the Catalog entries of a given object type.
 * The type of a particular `CatalogObject` is determined by the value of the
 * `type` attribute and only the corresponding data attribute can be set on the `CatalogObject` instance.
 * For example, the following list shows some instances of `CatalogObject` of a given `type` and
 * their corresponding data attribute that can be set:
 * - For a `CatalogObject` of the `ITEM` type, set the `item_data` attribute to yield the `CatalogItem` object.
 * - For a `CatalogObject` of the `ITEM_VARIATION` type, set the `item_variation_data` attribute to yield the `CatalogItemVariation` object.
 * - For a `CatalogObject` of the `MODIFIER` type, set the `modifier_data` attribute to yield the `CatalogModifier` object.
 * - For a `CatalogObject` of the `MODIFIER_LIST` type, set the `modifier_list_data` attribute to yield the `CatalogModifierList` object.
 * - For a `CatalogObject` of the `CATEGORY` type, set the `category_data` attribute to yield the `CatalogCategory` object.
 * - For a `CatalogObject` of the `DISCOUNT` type, set the `discount_data` attribute to yield the `CatalogDiscount` object.
 * - For a `CatalogObject` of the `TAX` type, set the `tax_data` attribute to yield the `CatalogTax` object.
 * - For a `CatalogObject` of the `IMAGE` type, set the `image_data` attribute to yield the `CatalogImageData`  object.
 * - For a `CatalogObject` of the `QUICK_AMOUNTS_SETTINGS` type, set the `quick_amounts_settings_data` attribute to yield the `CatalogQuickAmountsSettings` object.
 * - For a `CatalogObject` of the `PRICING_RULE` type, set the `pricing_rule_data` attribute to yield the `CatalogPricingRule` object.
 * - For a `CatalogObject` of the `TIME_PERIOD` type, set the `time_period_data` attribute to yield the `CatalogTimePeriod` object.
 * - For a `CatalogObject` of the `PRODUCT_SET` type, set the `product_set_data` attribute to yield the `CatalogProductSet`  object.
 * - For a `CatalogObject` of the `SUBSCRIPTION_PLAN` type, set the `subscription_plan_data` attribute to yield the `CatalogSubscriptionPlan` object.
 * For a more detailed discussion of the Catalog data model, please see the
 * [Design a Catalog](https://developer.squareup.com/docs/catalog-api/design-a-catalog) guide.
 */
export interface CatalogObject {
  /**
   * Possible types of CatalogObjects returned from the Catalog, each
   * containing type-specific properties in the `*_data` field corresponding to the object type.
   */
  type: string;
  /**
   * An identifier to reference this object in the catalog. When a new `CatalogObject`
   * is inserted, the client should set the id to a temporary identifier starting with
   * a "`#`" character. Other objects being inserted or updated within the same request
   * may use this identifier to refer to the new object.
   * When the server receives the new object, it will supply a unique identifier that
   * replaces the temporary identifier for all future references.
   */
  id: string;
  /**
   * Last modification [timestamp](https://developer.squareup.com/docs/build-basics/working-with-dates) in RFC 3339 format, e.g., `"2016-08-15T23:59:33.123Z"`
   * would indicate the UTC time (denoted by `Z`) of August 15, 2016 at 23:59:33 and 123 milliseconds.
   */
  updated_at?: string;
  /**
   * The version of the object. When updating an object, the version supplied
   * must match the version in the database, otherwise the write will be rejected as conflicting.
   */
  version?: bigint;
  /**
   * If `true`, the object has been deleted from the database. Must be `false` for new objects
   * being inserted. When deleted, the `updated_at` field will equal the deletion time.
   */
  is_deleted?: boolean;
  /**
   * A map (key-value pairs) of application-defined custom attribute values. The value of a key-value pair
   * is a [CatalogCustomAttributeValue]($m/CatalogCustomAttributeValue) object. The key is the `key` attribute
   * value defined in the associated [CatalogCustomAttributeDefinition]($m/CatalogCustomAttributeDefinition)
   * object defined by the application making the request.
   * If the `CatalogCustomAttributeDefinition` object is
   * defined by another application, the `CatalogCustomAttributeDefinition`'s key attribute value is prefixed by
   * the defining application ID. For example, if the `CatalogCustomAttributeDefinition` has a `key` attribute of
   * `"cocoa_brand"` and the defining application ID is `"abcd1234"`, the key in the map is `"abcd1234:cocoa_brand"`
   * if the application making the request is different from the application defining the custom attribute definition.
   * Otherwise, the key used in the map is simply `"cocoa_brand"`.
   * Application-defined custom attributes that are set at a global (location-independent) level.
   * Custom attribute values are intended to store additional information about a catalog object
   * or associations with an entity in another system. Do not use custom attributes
   * to store any sensitive information (personally identifiable information, card details, etc.).
   */
  custom_attribute_values?: Record<string, CatalogCustomAttributeValue>;
  /**
   * The Connect v1 IDs for this object at each location where it is present, where they
   * differ from the object's Connect V2 ID. The field will only be present for objects that
   * have been created or modified by legacy APIs.
   */
  catalog_v1_ids?: CatalogV1Id[];
  /**
   * If `true`, this object is present at all locations (including future locations), except where specified in
   * the `absent_at_location_ids` field. If `false`, this object is not present at any locations (including future locations),
   * except where specified in the `present_at_location_ids` field. If not specified, defaults to `true`.
   */
  present_at_all_locations?: boolean;
  /**
   * A list of locations where the object is present, even if `present_at_all_locations` is `false`.
   * This can include locations that are deactivated.
   */
  present_at_location_ids?: string[];
  /**
   * A list of locations where the object is not present, even if `present_at_all_locations` is `true`.
   * This can include locations that are deactivated.
   */
  absent_at_location_ids?: string[];
  /** Identifies the `CatalogImage` attached to this `CatalogObject`. */
  image_id?: string;
  /** A [CatalogObject]($m/CatalogObject) instance of the `ITEM` type, also referred to as an item, in the catalog. */
  item_data?: CatalogItem;
  /** A category to which a `CatalogItem` instance belongs. */
  category_data?: CatalogCategory;
  /**
   * An item variation (i.e., product) in the Catalog object model. Each item
   * may have a maximum of 250 item variations.
   */
  item_variation_data?: CatalogItemVariation;
  /** A tax applicable to an item. */
  tax_data?: CatalogTax;
  /** A discount applicable to items. */
  discount_data?: CatalogDiscount;
  /**
   * A list of modifiers applicable to items at the time of sale.
   * For example, a "Condiments" modifier list applicable to a "Hot Dog" item
   * may contain "Ketchup", "Mustard", and "Relish" modifiers.
   * Use the `selection_type` field to specify whether or not multiple selections from
   * the modifier list are allowed.
   */
  modifier_list_data?: CatalogModifierList;
  /** A modifier applicable to items at the time of sale. */
  modifier_data?: CatalogModifier;
  /** Represents a time period - either a single period or a repeating period. */
  time_period_data?: CatalogTimePeriod;
  /**
   * Represents a collection of catalog objects for the purpose of applying a
   * `PricingRule`. Including a catalog object will include all of its subtypes.
   * For example, including a category in a product set will include all of its
   * items and associated item variations in the product set. Including an item in
   * a product set will also include its item variations.
   */
  product_set_data?: CatalogProductSet;
  /**
   * Defines how discounts are automatically applied to a set of items that match the pricing rule
   * during the active time period.
   */
  pricing_rule_data?: CatalogPricingRule;
  /**
   * An image file to use in Square catalogs. It can be associated with catalog
   * items, item variations, and categories.
   */
  image_data?: CatalogImage;
  /**
   * Represents the unit used to measure a `CatalogItemVariation` and
   * specifies the precision for decimal quantities.
   */
  measurement_unit_data?: CatalogMeasurementUnit;
  /**
   * Describes a subscription plan. For more information, see
   * [Set Up and Manage a Subscription Plan](https://developer.squareup.com/docs/subscriptions-api/setup-plan).
   */
  subscription_plan_data?: CatalogSubscriptionPlan;
  /** A group of variations for a `CatalogItem`. */
  item_option_data?: CatalogItemOption;
  /**
   * An enumerated value that can link a
   * `CatalogItemVariation` to an item option as one of
   * its item option values.
   */
  item_option_value_data?: CatalogItemOptionValue;
  /**
   * Contains information defining a custom attribute. Custom attributes are
   * intended to store additional information about a catalog object or to associate a
   * catalog object with an entity in another system. Do not use custom attributes
   * to store any sensitive information (personally identifiable information, card details, etc.).
   * [Read more about custom attributes](https://developer.squareup.com/docs/catalog-api/add-custom-attributes)
   */
  custom_attribute_definition_data?: CatalogCustomAttributeDefinition;
  /** A parent Catalog Object model represents a set of Quick Amounts and the settings control the amounts. */
  quick_amounts_settings_data?: CatalogQuickAmountsSettings;
}
export declare const catalogObjectSchema: Schema<CatalogObject>;
