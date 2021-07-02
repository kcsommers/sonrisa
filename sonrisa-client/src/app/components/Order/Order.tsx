import {
  getMoneyString,
  getOrderSubtotal,
  getOrderTax,
  getOrderTotal,
  useCatalog,
  useOrdering,
} from '@core';
import { CartItem } from '../CartItem/CartItem';
import styles from './Order.module.scss';

export const Order = () => {
  const { orderState } = useOrdering();

  const { catalogImageMap } = useCatalog();

  return (
    <div>
      {!orderState?.lineItems?.length ? (
        <p className={styles.noItemsText}>*No items in cart</p>
      ) : (
        <>
          {orderState.lineItems?.map((item) => (
            <CartItem
              orderItem={item}
              key={item.uid}
              imageUrl={catalogImageMap[item.catalogObjectId as string]?.[0]}
            />
          ))}
          <div className={styles.checkoutWrap}>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Subtotal</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderSubtotal(orderState))}
              </p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Tax</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderTax(orderState))}
              </p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Total</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderTotal(orderState))}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
