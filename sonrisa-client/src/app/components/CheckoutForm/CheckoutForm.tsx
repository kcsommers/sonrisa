import { Button } from './../Button/Button';
import { useState, useEffect } from 'react';
import styles from './CheckoutForm.module.scss';
import { RouteComponentProps } from 'react-router';

export const CheckoutForm = (props: RouteComponentProps) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const submit = () => {
    console.log('NAME:::: ', name);
  };

  useEffect(() => {
    const initializeCard = async (payments: any) => {
      const card = await payments.card();
      await card.attach('#card-container');
      return card;
    };

    const initPayments = async () => {
      const appId = 'sandbox-sq0idb-IKN0-pQaUMYaI8XxPsxWDA';
      const locationId = 'LFDY60R7H887A';

      const payments = (window as any).Square.payments(appId, locationId);
      console.log('PAYMENT:::: ', payments);
      try {
        const card = await initializeCard(payments);
        console.log('CArD:::: ', card);
      } catch (e) {
        console.error('Initializing Card failed', e);
        return;
      }
    };

    console.log((window as any).Square);
    if (!(window as any).Square) {
      throw new Error('Square.js failed to load properly');
    }

    initPayments();
  }, []);

  return (
    <div className={styles.checkoutFormWrap}>
      <div id="card-container"></div>

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
        <Button text="Submit Payment" onClick={submit} />
      </div>
    </div>
  );
};
