import { CheckoutForm, OrderView } from '@components';
import { useOrdering } from '@core';
import { RouteComponentProps } from 'react-router-dom';
import { Order } from 'square';
import styles from './CheckoutPage.module.scss';

export const CheckoutPage = (props: RouteComponentProps) => {
  const { orderState } = useOrdering();

  return (
    <div className={styles.checkoutPageWrap}>
      <div className={styles.checkoutPageInner}>
        <div className={`${styles.paymentSection} ${styles.checkoutSection}`}>
          <h4>Payment</h4>
          <div className={styles.checkoutFormWrap}>
            <CheckoutForm order={orderState as Order} />
          </div>
        </div>
        <div className={`${styles.orderSection} ${styles.checkoutSection}`}>
          <h4>Order</h4>
          <OrderView />
        </div>
      </div>
    </div>
  );
};
