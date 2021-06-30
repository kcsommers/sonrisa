import { Schema } from '../schema';
import { Money } from './money';
import { OrderLineItemAppliedDiscount } from './orderLineItemAppliedDiscount';
import { OrderLineItemAppliedTax } from './orderLineItemAppliedTax';
import { OrderQuantityUnit } from './orderQuantityUnit';
import { OrderReturnLineItemModifier } from './orderReturnLineItemModifier';
/** The line item being returned in an order. */
export interface OrderReturnLineItem {
  /** A unique ID for this return line-item entry. */
  uid?: string;
  /** The `uid` of the line item in the original sale order. */
  source_line_item_uid?: string;
  /** The name of the line item. */
  name?: string;
  /**
   * The quantity returned, formatted as a decimal number.
   * For example, `"3"`.
   * Line items with a `quantity_unit` can have non-integer quantities.
   * For example, `"1.70000"`.
   */
  quantity: string;
  /**
   * Contains the measurement unit for a quantity and a precision that
   * specifies the number of digits after the decimal point for decimal quantities.
   */
  quantity_unit?: OrderQuantityUnit;
  /** The note of the return line item. */
  note?: string;
  /** The [CatalogItemVariation]($m/CatalogItemVariation) ID applied to this return line item. */
  catalog_object_id?: string;
  /** The name of the variation applied to this return line item. */
  variation_name?: string;
  /** Represents the line item type. */
  item_type?: string;
  /** The [CatalogModifier]($m/CatalogModifier)s applied to this line item. */
  return_modifiers?: OrderReturnLineItemModifier[];
  /**
   * The list of references to `OrderReturnTax` entities applied to the return line item. Each
   * `OrderLineItemAppliedTax` has a `tax_uid` that references the `uid` of a top-level
   * `OrderReturnTax` applied to the return line item. On reads, the applied amount
   * is populated.
   */
  applied_taxes?: OrderLineItemAppliedTax[];
  /**
   * The list of references to `OrderReturnDiscount` entities applied to the return line item. Each
   * `OrderLineItemAppliedDiscount` has a `discount_uid` that references the `uid` of a top-level
   * `OrderReturnDiscount` applied to the return line item. On reads, the applied amount
   * is populated.
   */
  applied_discounts?: OrderLineItemAppliedDiscount[];
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  base_price_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  variation_total_price_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  gross_return_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  total_tax_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  total_discount_money?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  total_money?: Money;
}
export declare const orderReturnLineItemSchema: Schema<OrderReturnLineItem>;
