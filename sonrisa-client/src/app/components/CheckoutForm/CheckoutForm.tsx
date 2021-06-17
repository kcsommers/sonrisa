import { Button } from './../Button/Button';
import { useState, useEffect } from 'react';
import styles from './CheckoutForm.module.scss';
import { RouteComponentProps } from 'react-router';
import { environments } from '../../../environments';
import { Api } from '@core';

const PaymentStatuses = {
  PENDING: 'PENDING',

  SUCCESS: 'SUCCESS',

  ERROR: 'ERROR',
};

export const CheckoutForm = (props: RouteComponentProps) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [paymentMethod, setPaymentMethod] = useState(null);

  const [paymentStatus, setPaymentStatus] = useState('');

  const submit = async () => {
    const _tokenizeCard = async () => {
      if (!paymentMethod) {
        return;
      }

      const tokenResult = await (paymentMethod as any).tokenize();
      if (tokenResult.status === 'OK') {
        return tokenResult.token;
      } else {
        let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
        }
        throw new Error(errorMessage);
      }
    };

    try {
      const _cardToken = await _tokenizeCard();
      console.log('card token:::: ', _cardToken);
      const _paymentResponse = Api.createPayment(
        environments[process.env.NODE_ENV].SQUARE_LOCATION_ID as string,
        _cardToken
      )
        .then((res) => {
          console.log('payment response:::: ', res);
        })
        .catch((err) => console.error(err));
      setPaymentStatus(PaymentStatuses.SUCCESS);
    } catch (e) {
      console.error(e.message);
      setPaymentStatus(PaymentStatuses.ERROR);
    }
  };

  useEffect(() => {
    const _initPayments = async () => {
      const _appId = 'sandbox-sq0idb-IKN0-pQaUMYaI8XxPsxWDA';
      const _locationId = 'LFDY60R7H887A';

      const _payments = (window as any).Square.payments(_appId, _locationId);
      try {
        const _card = await _payments.card();
        await _card.attach('#card-container');
        setPaymentMethod(_card);
      } catch (e) {
        console.error('Initializing Card failed', e);
        return;
      }
    };

    if (!(window as any).Square) {
      throw new Error('Square.js failed to load properly');
    }

    _initPayments();
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
