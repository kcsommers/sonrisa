import {
  getMoneyString,
  getOrderSubtotal,
  getOrderTax,
  getOrderTotal,
  useCatalog,
  useOrdering,
} from '@core';
import { CartItem } from '../CartItem/CartItem';
import styles from './OrderView.module.scss';

export const OrderView = () => {
  const { currentOrder } = useOrdering();

  const { catalogImageMap } = useCatalog();

  return (
    <div>
      {!currentOrder?.lineItems?.length ? (
        <p className={styles.noItemsText}>*No items in cart</p>
      ) : (
        <>
          {currentOrder.lineItems?.map((item) => (
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
                {getMoneyString(getOrderSubtotal(currentOrder))}
              </p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Tax</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderTax(currentOrder))}
              </p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Total</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderTotal(currentOrder))}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
