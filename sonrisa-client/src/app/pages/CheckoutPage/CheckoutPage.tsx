import { CheckoutForm } from '@components';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from './../../components/Header/Header';
import styles from './CheckoutPage.module.scss';

export const CheckoutPage = (props: RouteComponentProps) => {
  return (
    <div className={styles.checkoutPageWrap}>
      <div className={styles.checkoutPageInner}>
        <div className={`${styles.paymentSection} ${styles.checkoutSection}`}>
          <h4>Payment</h4>
          <CheckoutForm />
        </div>
        <div className={`${styles.orderSection} ${styles.checkoutSection}`}>
          <h4>Order</h4>
        </div>
      </div>
    </div>
  );
};
