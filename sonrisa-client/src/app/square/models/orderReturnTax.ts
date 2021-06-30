import { Schema } from '../schema';
import { Money } from './money';
/**
 * Represents a tax being returned that applies to one or more return line items in an order.
 * Fixed-amount, order-scoped taxes are distributed across all non-zero return line item totals.
 * The amount distributed to each return line item is relative to that item’s contribution to the
 * order subtotal.
 */
export interface OrderReturnTax {
  /** A unique ID that identifies the returned tax only within this order. */
  uid?: string;
  /** The tax `uid` from the order that contains the original tax charge. */
  source_tax_uid?: string;
  /** The catalog object ID referencing [CatalogTax]($m/CatalogTax). */
  catalog_object_id?: string;
  /** The tax's name. */
  name?: string;
  /** Indicates how the tax is applied to the associated line item or order. */
  type?: string;
  /**
   * The percentage of the tax, as a string representation of a decimal number.
   * For example, a value of `"7.25"` corresponds to a percentage of 7.25%.
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
  applied_money?: Money;
  /** Indicates whether this is a line-item or order-level tax. */
  scope?: string;
}
export declare const orderReturnTaxSchema: Schema<OrderReturnTax>;
