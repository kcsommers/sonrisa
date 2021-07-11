import { CheckoutForm, OrderView } from '@components';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Payment } from 'square';
import styles from './CheckoutPage.module.scss';

export const CheckoutPage = (props: RouteComponentProps) => {
  const onCheckout = (success: boolean, payment?: Payment): void => {
    // route to success page on success
    props.history.push('/checkout/success', { payment });
  };

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.checkoutPageWrap}>
      <div className={styles.checkoutPageInner}>
        <div className={`${styles.paymentSection} ${styles.checkoutSection}`}>
          <h4>Payment</h4>
          <div className={styles.checkoutFormWrap}>
            <CheckoutForm onCheckout={onCheckout} />
          </div>
        </div>
        <div className={`${styles.orderSection} ${styles.checkoutSection}`}>
          <h4>Order</h4>
          <OrderView canRemoveItems={false} />
        </div>
      </div>
    </div>
  );
};
