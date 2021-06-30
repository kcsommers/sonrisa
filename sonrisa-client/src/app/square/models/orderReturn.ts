import { Schema } from '../schema';
import { OrderMoneyAmounts } from './orderMoneyAmounts';
import { OrderReturnDiscount } from './orderReturnDiscount';
import { OrderReturnLineItem } from './orderReturnLineItem';
import { OrderReturnServiceCharge } from './orderReturnServiceCharge';
import { OrderReturnTax } from './orderReturnTax';
import { OrderRoundingAdjustment } from './orderRoundingAdjustment';
/** The set of line items, service charges, taxes, discounts, tips, and other items being returned in an order. */
export interface OrderReturn {
  /** A unique ID that identifies the return only within this order. */
  uid?: string;
  /**
   * An order that contains the original sale of these return line items. This is unset
   * for unlinked returns.
   */
  source_order_id?: string;
  /** A collection of line items that are being returned. */
  return_line_items?: OrderReturnLineItem[];
  /** A collection of service charges that are being returned. */
  return_service_charges?: OrderReturnServiceCharge[];
  /**
   * A collection of references to taxes being returned for an order, including the total
   * applied tax amount to be returned. The taxes must reference a top-level tax ID from the source
   * order.
   */
  return_taxes?: OrderReturnTax[];
  /**
   * A collection of references to discounts being returned for an order, including the total
   * applied discount amount to be returned. The discounts must reference a top-level discount ID
   * from the source order.
   */
  return_discounts?: OrderReturnDiscount[];
  /**
   * A rounding adjustment of the money being returned. Commonly used to apply cash rounding
   * when the minimum unit of the account is smaller than the lowest physical denomination of the currency.
   */
  rounding_adjustment?: OrderRoundingAdjustment;
  /** A collection of various money amounts. */
  return_amounts?: OrderMoneyAmounts;
}
export declare const orderReturnSchema: Schema<OrderReturn>;
