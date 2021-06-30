import { Schema } from '../schema';
/**
 * Defines how discounts are automatically applied to a set of items that match the pricing rule
 * during the active time period.
 */
export interface CatalogPricingRule {
  /**
   * User-defined name for the pricing rule. For example, "Buy one get one
   * free" or "10% off".
   */
  name?: string;
  /**
   * A list of unique IDs for the catalog time periods when
   * this pricing rule is in effect. If left unset, the pricing rule is always
   * in effect.
   */
  time_period_ids?: string[];
  /**
   * Unique ID for the `CatalogDiscount` to take off
   * the price of all matched items.
   */
  discount_id?: string;
  /**
   * Unique ID for the `CatalogProductSet` that will be matched by this rule. A match rule
   * matches within the entire cart, and can match multiple times. This field will always be set.
   */
  match_products_id?: string;
  /**
   * __Deprecated__: Please use the `exclude_products_id` field to apply
   * an exclude set instead. Exclude sets allow better control over quantity
   * ranges and offer more flexibility for which matched items receive a discount.
   * `CatalogProductSet` to apply the pricing to.
   * An apply rule matches within the subset of the cart that fits the match rules (the match set).
   * An apply rule can only match once in the match set.
   * If not supplied, the pricing will be applied to all products in the match set.
   * Other products retain their base price, or a price generated by other rules.
   */
  apply_products_id?: string;
  /**
   * `CatalogProductSet` to exclude from the pricing rule.
   * An exclude rule matches within the subset of the cart that fits the match rules (the match set).
   * An exclude rule can only match once in the match set.
   * If not supplied, the pricing will be applied to all products in the match set.
   * Other products retain their base price, or a price generated by other rules.
   */
  exclude_products_id?: string;
  /** Represents the date the Pricing Rule is valid from. Represented in RFC 3339 full-date format (YYYY-MM-DD). */
  valid_from_date?: string;
  /**
   * Represents the local time the pricing rule should be valid from. Represented in RFC 3339 partial-time format
   * (HH:MM:SS). Partial seconds will be truncated.
   */
  valid_from_local_time?: string;
  /** Represents the date the Pricing Rule is valid until. Represented in RFC 3339 full-date format (YYYY-MM-DD). */
  valid_until_date?: string;
  /**
   * Represents the local time the pricing rule should be valid until. Represented in RFC 3339 partial-time format
   * (HH:MM:SS). Partial seconds will be truncated.
   */
  valid_until_local_time?: string;
  /**
   * Indicates which products matched by a CatalogPricingRule
   * will be excluded if the pricing rule uses an exclude set.
   */
  exclude_strategy?: string;
  /**
   * A list of IDs of customer groups, the members of which are eligible for discounts specified in this pricing rule.
   * Notice that a group ID is generated by the Customers API.
   * If this field is not set, the specified discount applies to matched products sold to anyone whether the buyer
   * has a customer profile created or not. If this `customer_group_ids_any` field is set, the specified discount
   * applies only to matched products sold to customers belonging to the specified customer groups.
   */
  customer_group_ids_any?: string[];
}
export declare const catalogPricingRuleSchema: Schema<CatalogPricingRule>;