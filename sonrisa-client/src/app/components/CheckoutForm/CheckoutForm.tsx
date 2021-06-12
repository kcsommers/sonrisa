import styles from './CheckoutForm.module.scss';
import { Button } from './../Button/Button';
import { useState } from 'react';

export const CheckoutForm = () => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [cardNumber, setCardNumber] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [expiration, setExpiration] = useState('');

  const [cvv, setCvv] = useState('');

  const submit = () => {
    console.log('NAME:::: ', name);
  };

  return (
    <div className={styles.checkoutFormWrap}>
      <div className={styles.inputWrap}>
        <input
          type="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        <input
          type="phone"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        <input
          type="number"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        <input
          type="number"
          placeholder="Expiration"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        <input
          type="number"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        <Button text="Submit Payment" onClick={submit} />
      </div>
    </div>
  );
};
