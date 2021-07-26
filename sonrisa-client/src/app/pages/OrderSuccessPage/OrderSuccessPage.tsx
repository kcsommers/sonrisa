import { useOrdering } from '@core';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Payment } from 'square';
import styles from './OrderSuccessPage.module.scss';

interface ISuccessPageLocationState {
  payment: Payment;
}

export const OrderSuccessPage = () => {
  const { clearOrder } = useOrdering();

  const { state } = useLocation<ISuccessPageLocationState>();

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.payment) {
      clearOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={`${styles.pageInner} responsive-container`}>
        <div className={`${styles.messageWrap}`}>
          {state && state.payment ? (
            <>
              <h4>Thank you!</h4>
              <h3>Your order has been placed</h3>
              <a href={state.payment.receiptUrl}>
                Click here to view your receipt
              </a>
              <p>
                Thank you for your order! You've made me smile! I hope my
                sonrisa brings you sonrisa &#9786;. Your order will be available
                for pickup in Capitol Hill, Seattle, on Monday between 1pm and
                4pm. You should receive an email shortly with these
                instructions, as well as the pickup location.
              </p>
            </>
          ) : (
            <>
              <h4>Whoops!</h4>
              <p>
                There was a problem processing your order. Please try again.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
