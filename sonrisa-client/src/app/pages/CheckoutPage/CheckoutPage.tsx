import { Button, CheckoutForm, Order } from '@components';
import { useAppSelector } from '@redux';
import { RouteComponentProps } from 'react-router-dom';
import styles from './CheckoutPage.module.scss';

export const CheckoutPage = (props: RouteComponentProps) => {
  const orderState = useAppSelector((state) => state.order);

  return (
    <div className={styles.checkoutPageWrap}>
      <div className={styles.checkoutPageInner}>
        <div className={styles.paymentSection}>
          <h4>Payment</h4>
          <div className={styles.checkoutFormWrap}>
            <CheckoutForm {...props} />
          </div>
        </div>
        <div className={styles.orderSection}>
          <h4>Order</h4>
          <Order />
        </div>
      </div>
    </div>
  );
};
