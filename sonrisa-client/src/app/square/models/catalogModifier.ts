import { Schema } from '../schema';
import { Money } from './money';
/** A modifier applicable to items at the time of sale. */
export interface CatalogModifier {
  /** The modifier name.  This is a searchable attribute for use in applicable query filters, and its value length is of Unicode code points. */
  name?: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  price_money?: Money;
  /** Determines where this `CatalogModifier` appears in the `CatalogModifierList`. */
  ordinal?: number;
  /** The ID of the `CatalogModifierList` associated with this modifier. */
  modifier_list_id?: string;
}
export declare const catalogModifierSchema: Schema<CatalogModifier>;
