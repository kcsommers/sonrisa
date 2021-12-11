import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Customer } from 'square';
import { Api, logger } from '../../core/public';
import { Button } from '../Button/Button';
import styles from './ContactForm.module.scss';

interface IContactFormProps {
  formSubmitted: (success: boolean) => void;
}

export const ContactForm = ({ formSubmitted }: IContactFormProps) => {
  const [givenName, setGivenName] = useState('');

  const [givenNameError, setGivenNameError] = useState('');

  const [familyName, setFamilyName] = useState('');

  const [familyNameError, setFamilyNameError] = useState('');

  const [emailAddress, setEmailAddress] = useState('');

  const [emailAddressError, setEmailAddressError] = useState('');

  const [message, setMessage] = useState('');

  const [messageError, setMessageError] = useState('');

  const [sendingMessage, setSendingMessage] = useState(false);

  const clearForm = () => {
    setGivenName('');
    setFamilyName('');
    setEmailAddress('');
    setMessage('');
  };

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

    if (!message) {
      setMessageError('Please enter a message');
      isValid = false;
    } else {
      setMessageError('');
    }

    return isValid;
  };

  const submitForm = () => {
    if (!validateForm()) {
      return;
    }

    setSendingMessage(true);

    const _customer: Customer = {
      givenName,
      familyName,
      emailAddress,
    };

    Api.contact({
      message,
      customer: _customer,
    })
      .then((res) => {
        logger.log('[contact success]:::: ', res);
        setSendingMessage(false);
        formSubmitted(true);
        clearForm();
      })
      .catch((err) => {
        logger.error(err);
        setSendingMessage(false);
        formSubmitted(false);
      });
  };

  return (
    <>
      <h3>Get in Touch</h3>
      <div className={styles.contactFormWrap}>
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
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {messageError && (
            <p className={`${styles.inputErrorText} error-color`}>
              <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
              {messageError}
            </p>
          )}
        </div>
        <Button
          text="Submit"
          size="md"
          isFullWidth={false}
          onClick={submitForm}
          showSpinner={sendingMessage}
        />
      </div>
    </>
  );
};
