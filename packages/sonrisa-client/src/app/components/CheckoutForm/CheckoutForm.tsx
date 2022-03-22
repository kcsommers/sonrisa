import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  OrderFulfillmentScheduleTypes,
  OrderFulfillmentTypes,
} from '@sonrisa/core';
import { useEffect, useState } from 'react';
import { CreatePaymentRequest, Customer, Payment } from 'square';
import { v4 as uuidV4 } from 'uuid';
import { environments } from '../../../environments';
import { useOrdering } from '../../context';
import {
  getOrderSubtotal,
  getOrderTotal,
  getPickupTime,
  logger,
} from '../../utils';
import { TipBox } from '../TipBox/TipBox';
import { Button } from './../Button/Button';
import styles from './CheckoutForm.module.scss';

interface ICheckoutFormProps {
  onCheckout: (success: boolean, payment?: Payment) => void;
}

export const CheckoutForm = ({ onCheckout }: ICheckoutFormProps) => {
  const { currentOrder, updateOrder, createPayment, pickupEvent } =
    useOrdering();
  const { tipMoney } = useOrdering();
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
  const [submittingForm, setSubmittingForm] = useState<boolean>(false);

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
    if (!validateForm() || !paymentMethod || !currentOrder) {
      return;
    }

    setSubmittingForm(true);

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

    const _handleError = (err: Error) => {
      logger.error(err);
      setSubmittingForm(false);
      onCheckout(false);
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

      // create the payment request
      const _totalMoney = getOrderTotal(currentOrder);
      const _paymentRequest: CreatePaymentRequest = {
        idempotencyKey: uuidV4(),
        sourceId: _cardToken,
        orderId: currentOrder?.id,
        amountMoney: {
          currency: 'USD',
          // @ts-ignore
          amount: String(_totalMoney),
        },
        tipMoney,
      };
      // update the order with fulfillments and customer info
      // if it hasn't already been done
      if (!currentOrder.fulfillments) {
        const _fulfillments = [
          {
            type: OrderFulfillmentTypes.PICKUP,
            pickupDetails: {
              scheduleType: OrderFulfillmentScheduleTypes.SCHEDULED,
              pickupAt: getPickupTime(),
              note: message,
              recipient: {
                displayName: `${_customer.givenName} ${_customer.familyName}`,
                emailAddress: _customer.emailAddress,
                phoneNumber: _customer.phoneNumber,
              },
            },
          },
        ];
        updateOrder({ fulfillments: _fulfillments })
          .then((res) => {
            logger.log('[update order response]:::: ', res);

            // create the payment
            createPayment(_paymentRequest, _customer)
              .then((res) => {
                logger.log('[create payment response]:::: ', res);
                setSubmittingForm(false);
                onCheckout(true, res);
              })
              .catch(_handleError);
          })
          .catch(_handleError);
      } else {
        // if fulfillments have already been added just create the payment
        createPayment(_paymentRequest, _customer)
          .then((res) => {
            logger.log('[create payment response]:::: ', res);
            setSubmittingForm(false);
            onCheckout(true, res);
          })
          .catch(_handleError);
      }
    } catch (e: any) {
      setSubmittingForm(false);
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
        {givenNameError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon
              icon={faExclamationCircle as IconProp}
            ></FontAwesomeIcon>
            {givenNameError}
          </p>
        )}
        <input
          type='name'
          placeholder='First Name'
          value={givenName}
          onChange={(e) => setGivenName(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        {familyNameError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon
              icon={faExclamationCircle as IconProp}
            ></FontAwesomeIcon>
            {familyNameError}
          </p>
        )}
        <input
          type='name'
          placeholder='Last Name'
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        {emailAddressError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon
              icon={faExclamationCircle as IconProp}
            ></FontAwesomeIcon>
            {emailAddressError}
          </p>
        )}
        <input
          type='email'
          placeholder='Email Address'
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        {phoneNumberError && (
          <p className={`${styles.inputErrorText} error-color`}>
            <FontAwesomeIcon
              icon={faExclamationCircle as IconProp}
            ></FontAwesomeIcon>
            {phoneNumberError}
          </p>
        )}
        <input
          type='phone'
          placeholder='Phone Number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.inputWrap}>
        <textarea
          placeholder='Optional Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className={styles.tipBoxWrap}>
        <label className={styles.label} htmlFor='tipbox'>
          Tip
        </label>
        <TipBox subTotal={getOrderSubtotal(currentOrder!)} />
      </div>
      <div id='card-container'></div>
      <div className={styles.inputWrap}>
        <Button
          text='Submit Payment'
          onClick={submit}
          showSpinner={submittingForm}
          isDisabled={
            !!(
              !givenName ||
              !familyName ||
              !emailAddress ||
              !phoneNumber ||
              !pickupEvent
            )
          }
        />
      </div>
    </div>
  );
};
