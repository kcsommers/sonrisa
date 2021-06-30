import { Schema } from '../schema';
import { Money } from './money';
/** A [CatalogModifier]($m/CatalogModifier). */
export interface OrderLineItemModifier {
  /** A unique ID that identifies the modifier only within this order. */
  uid?: string;
  /** The catalog object ID referencing [CatalogModifier]($m/CatalogModifier). */
  catalog_object_id?: string;
  /** The name of the item modifier. */
  name?: string;
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
  total_price_money?: Money;
}
export declare const orderLineItemModifierSchema: Schema<OrderLineItemModifier>;
