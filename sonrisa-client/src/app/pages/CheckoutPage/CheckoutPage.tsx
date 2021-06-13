import { CheckoutForm, Order } from '@components';
import { RouteComponentProps } from 'react-router-dom';
import styles from './CheckoutPage.module.scss';

export const CheckoutPage = (props: RouteComponentProps) => {
  return (
    <div className={styles.checkoutPageWrap}>
      <div className={styles.checkoutPageInner}>
        <div className={`${styles.paymentSection} ${styles.checkoutSection}`}>
          <h4>Payment</h4>
          <div className={styles.checkoutFormWrap}>
            <CheckoutForm {...props} />
          </div>
        </div>
        <div className={`${styles.orderSection} ${styles.checkoutSection}`}>
          <h4>Order</h4>
          <Order />
        </div>
      </div>
    </div>
  );
};
