import { useAppSelector } from '@redux';
import { CartItem } from './../CartItem/CartItem';
import styles from './Order.module.scss';

export const Order = () => {
  const orderState = useAppSelector((state) => state.order);

  const getTotals = (): { tax: string; total: string; subtotal: string } => {
    if (!orderState || !orderState.items.length) {
      return {
        tax: '$0.00',
        total: '$0.00',
        subtotal: '$0.00',
      };
    }

    const subtotal = orderState.items.reduce((t, orderItem) => {
      t += orderItem.item.price * orderItem.quantity;
      return t;
    }, 0);

    const tax = subtotal * 0.07;

    return {
      tax: `$${(tax / 100).toFixed(2)}`,
      total: `$${((subtotal + tax) / 100).toFixed(2)}`,
      subtotal: `$${(subtotal / 100).toFixed(2)}`,
    };
  };

  const { tax, total, subtotal } = getTotals();

  return (
    <div className={`${styles.orderWrap}`}>
      {!orderState?.items.length ? (
        <p className={styles.noItemsText}>*No items in cart</p>
      ) : (
        <>
          {orderState.items.map((item) => (
            <CartItem orderItem={item} key={item.item._id} />
          ))}
          <div className={styles.checkoutWrap}>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Subtotal</p>
              <p className={styles.checkoutItemTotal}>{subtotal}</p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Tax</p>
              <p className={styles.checkoutItemTotal}>{tax}</p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Total</p>
              <p className={styles.checkoutItemTotal}>{total}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
