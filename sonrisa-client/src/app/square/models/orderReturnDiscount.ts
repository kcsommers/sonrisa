import { Schema } from '../schema';
import { Money } from './money';
/**
 * Represents a discount being returned that applies to one or more return line items in an
 * order.
 * Fixed-amount, order-scoped discounts are distributed across all non-zero return line item totals.
 * The amount distributed to each return line item is relative to that item’s contribution to the
 * order subtotal.
 */
export interface OrderReturnDiscount {
  /** A unique ID that identifies the returned discount only within this order. */
  uid?: string;
  /** The discount `uid` from the order that contains the original application of this discount. */
  source_discount_uid?: string;
  /** The catalog object ID referencing [CatalogDiscount]($m/CatalogDiscount). */
  catalog_object_id?: string;
  /** The discount's name. */
  name?: string;
  /** Indicates how the discount is applied to the associated line item or order. */
  type?: string;
  /**
   * The percentage of the tax, as a string representation of a decimal number.
   * A value of `"7.25"` corresponds to a percentage of 7.25%.
   * `percentage` is not set for amount-based discounts.
   */
  percentage?: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  amount_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  applied_money?: Money;
  /** Indicates whether this is a line-item or order-level discount. */
  scope?: string;
}
export declare const orderReturnDiscountSchema: Schema<OrderReturnDiscount>;
