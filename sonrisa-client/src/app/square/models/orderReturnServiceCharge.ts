import { Schema } from '../schema';
import { Money } from './money';
import { OrderLineItemAppliedTax } from './orderLineItemAppliedTax';
/** Represents the service charge applied to the original order. */
export interface OrderReturnServiceCharge {
  /** A unique ID that identifies the return service charge only within this order. */
  uid?: string;
  /**
   * The service charge `uid` from the order containing the original
   * service charge. `source_service_charge_uid` is `null` for
   * unlinked returns.
   */
  source_service_charge_uid?: string;
  /** The name of the service charge. */
  name?: string;
  /** The catalog object ID of the associated [OrderServiceCharge]($m/OrderServiceCharge). */
  catalog_object_id?: string;
  /**
   * The percentage of the service charge, as a string representation of
   * a decimal number. For example, a value of `"7.25"` corresponds to a
   * percentage of 7.25%.
   * Either `percentage` or `amount_money` should be set, but not both.
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
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  total_money?: Money;
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
   * Represents a phase in the process of calculating order totals.
   * Service charges are applied after the indicated phase.
   * [Read more about how order totals are calculated.](https://developer.squareup.com/docs/orders-api/how-it-works#how-totals-are-calculated)
   */
  calculation_phase?: string;
  /**
   * Indicates whether the surcharge can be taxed. Service charges
   * calculated in the `TOTAL_PHASE` cannot be marked as taxable.
   */
  taxable?: boolean;
  /**
   * The list of references to `OrderReturnTax` entities applied to the
   * `OrderReturnServiceCharge`. Each `OrderLineItemAppliedTax` has a `tax_uid`
   * that references the `uid` of a top-level `OrderReturnTax` that is being
   * applied to the `OrderReturnServiceCharge`. On reads, the applied amount is
   * populated.
   */
  applied_taxes?: OrderLineItemAppliedTax[];
}
export declare const orderReturnServiceChargeSchema: Schema<OrderReturnServiceCharge>;