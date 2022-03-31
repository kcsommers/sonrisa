import { IPickupEvent } from '@sonrisa/core';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Payment } from 'square';
import { Button, PickupEventDisplay } from '../../components';
import { useOrdering } from '../../context';
import styles from './OrderSuccessPage.module.scss';

interface ISuccessPageLocationState {
  payment: Payment;
  pickupEvent: IPickupEvent;
}

export const OrderSuccessPage = () => {
  const { clearOrder } = useOrdering();
  const { state } = useLocation<ISuccessPageLocationState>();
  const history = useHistory();

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
              <p style={{ marginBottom: '1rem' }}>
                Thank you for your order! You've made me smile! I hope my
                sonrisa brings you sonrisa &#9786;. The pickup details for your
                order are listed below, and will be emailed to you shortly.
              </p>
              <PickupEventDisplay
                pickupEvent={state.pickupEvent}
                showAddress={true}
                useCard={false}
              ></PickupEventDisplay>
            </>
          ) : (
            <>
              <h4>Whoops!</h4>
              <p style={{ marginBottom: '1rem' }}>
                There was a problem processing your order. Please try again.
              </p>
              <Button
                onClick={() => history.push('/checkout')}
                isFullWidth={false}
                text='Back to Checkout'
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
