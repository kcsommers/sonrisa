import { logger } from '@core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Customer } from 'square';
import { environments } from '../../../environments';
import { Button } from './../Button/Button';
import styles from './CheckoutForm.module.scss';

interface ICheckoutFormProps {
  formSubmitted: (
    customer: Customer,
    message: string,
    cardToken: string
  ) => void;
}

export const CheckoutForm = ({ formSubmitted }: ICheckoutFormProps) => {
  const [givenName, setGivenName] = useState('');

  const [givenNameError, setGivenNameError] = useState('');

  const [familyName, setFamilyName] = useState('');

  const [familyNameError, setFamilyNameError] = useState('');

  const [emailAddress, setEmailAddress] = useState('');

  const [emailAddressError, setEmailAddressError] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [paymentMethod, setPaymentMethod] = useState(null);

  const [message, setMessage] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;

    if (!givenName) {
      setGivenNameError('Please enter a first name');
      isValid = false;
    } else {
      setGivenNameError('');
    }

    if (!familyName) {
      setFamilyNameError('Please enter a last name');
      isValid = false;
    } else {
      setFamilyNameError('');
    }

    if (!emailAddress) {
      setEmailAddressError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailAddressError('');
    }

    if (!phoneNumber) {
      setPhoneNumberError('Please enter a valid phone number');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    return isValid;
  };

  const submit = async () => {
    if (!validateForm() || !paymentMethod) {
      return;
    }

    const _tokenizeCard = async () => {
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
      logger.log('card token:::: ', _cardToken);

      const _customer: Customer = {
        givenName,
        familyName,
        emailAddress,
        phoneNumber,
      };

      formSubmitted(_customer, message, _cardToken);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    const _initPayments = async () => {
      const _appId = environments[process.env.NODE_ENV].SQUARE_APP_ID;
      const _locationId = environments[process.env.NODE_ENV].SQUARE_LOCATION_ID;

      const _payments = (window as any).Square.payments(_appId, _locationId);
      try {
        const _card = await _payments.card();
        await _card.attach('#card-container');
        setPaymentMethod(_card);
      } catch (e) {
        logger.error('Initializing Card failed', e);
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
      <div className={styles.inputWrap}>
        <input
          type="name"
          placeholder="First Name"
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
        />
        {givenNameError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
            {givenNameError}
          </p>
        )}
      </div>
      <div className={styles.inputWrap}>
        <input
          type="name"
          placeholder="Last Name"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
        {familyNameError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
            {familyNameError}
          </p>
        )}
      </div>
      <div className={styles.inputWrap}>
        <input
          type="email"
          placeholder="Email Address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        {emailAddressError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
            {emailAddressError}
          </p>
        )}
      </div>
      <div className={styles.inputWrap}>
        <input
          type="phone"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {phoneNumberError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
            {phoneNumberError}
          </p>
        )}
      </div>

      <div className={styles.inputWrap}>
        <textarea
          placeholder="Optional Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div id="card-container"></div>

      <div className={styles.inputWrap}>
        <Button text="Submit Payment" onClick={submit} />
      </div>
    </div>
  );
};
