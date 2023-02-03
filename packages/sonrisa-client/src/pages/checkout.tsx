import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Payment } from 'square';
import { Alert } from '../components/Alert/Alert';
import { CheckoutForm } from '../components/CheckoutForm/CheckoutForm';
import { OrderView } from '../components/OrderView/OrderView';
import { PickupEventDisplay } from '../components/PickupEventDisplay/PickupEventDisplay';
import { useOrdering } from '../context';
import { logger } from '../utils';
import styles from './styles/CheckoutPage.module.scss';

export default () => {
  const { orderingStatus } = useOrdering();
  const router = useRouter();
  const [cardSdkLoaded, setCardSdkLoaded] = useState(false);
  const { currentOrder } = useOrdering();

  const onCheckout = (success: boolean, payment?: Payment): void => {
    // route to success page on success
    logger.log('[onCheckout]:::: ', success, payment);
    router.push({
      pathname: '/order-details',
      query: {
        success,
        paymentId: payment?.id,
      },
    });
  };

  if (!orderingStatus.acceptingOrders) {
    return (
      <div className={styles.alertWrap}>
        <Alert type='danger' message={orderingStatus.message!} />
      </div>
    );
  }

  return (
    <>
      <Script
        onLoad={() => setCardSdkLoaded(true)}
        onError={() => setCardSdkLoaded(true)}
        src={
          process.env.NODE_ENV === 'production'
            ? 'https://web.squarecdn.com/v1/square.js'
            : 'https://sandbox.web.squarecdn.com/v1/square.js'
        }
      />
      <div className={`${styles.checkoutPageWrap} responsive-container`}>
        <div
          className={`${styles.checkoutPageInner} ${styles.checkoutSection}`}
        >
          <div className={styles.pickupLocationWrap}>
            <FontAwesomeIcon icon={faMapMarkerAlt as IconProp} />
            <div className={styles.pickupLocationWrapInner}>
              <h6>Pickup Date and Location</h6>
              {orderingStatus.pickupEvent && (
                <div style={{ marginBottom: '1rem' }}>
                  <PickupEventDisplay
                    pickupEvent={orderingStatus.pickupEvent}
                    useCard={false}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={`${styles.paymentSection} ${styles.checkoutSection}`}>
            <div className='inner-border'></div>
            <div className={styles.checkoutSectionInner}>
              <h4>Payment</h4>
              <div className={styles.checkoutFormWrap}>
                <CheckoutForm
                  onCheckout={onCheckout}
                  cardSdkLoaded={cardSdkLoaded}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.orderSection} ${styles.checkoutSection}`}>
            <div className='inner-border'></div>
            <div className={styles.checkoutSectionInner}>
              <h4>Order</h4>
              <OrderView canRemoveItems={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
