import styles from './CheckoutForm.module.scss';
import { Button } from './../Button/Button';
import { RouteComponentProps } from 'react-router';

export const CheckoutForm = (props: RouteComponentProps) => {
  return (
    <div className={styles.checkoutFormWrap}>
      <div className={styles.inputWrap}>
        <input type="name" placeholder="Full Name" />
      </div>
      <div className={styles.inputWrap}>
        <input type="email" placeholder="Email Address" />
      </div>
      <div className={styles.inputWrap}>
        <input type="phone" placeholder="Phone Number" />
      </div>
      <div className={styles.inputWrap}>
        <input type="number" placeholder="Card Number" />
      </div>
      <div className={styles.inputWrap}>
        <input type="number" placeholder="Expiration" />
      </div>
      <div className={styles.inputWrap}>
        <input type="number" placeholder="CVV" />
      </div>
      <div className={styles.inputWrap}>
        <Button
          text="Submit Payment"
          onClick={() => props.history.push('/checkout/success')}
        />
      </div>
    </div>
  );
};
