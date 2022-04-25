import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Payment } from 'square';
import { environments } from '../../../environments';
import {
  Alert,
  CheckoutForm,
  OrderView,
  PickupEventDisplay,
} from '../../components';
import { useOrdering } from '../../context';
import { logger } from '../../utils';
import styles from './CheckoutPage.module.scss';

const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;

export const CheckoutPage = (props: RouteComponentProps) => {
  // const [pickupEventOverlayOpen, setPickupEventOverlayOpen] =
  // useState<boolean>(false);
  // const [upcomingEvents, setUpcomingEvents] = useState<IPickupEvent[]>();
  const { orderingStatus } = useOrdering();

  const onCheckout = (success: boolean, payment?: Payment): void => {
    // route to success page on success
    logger.log('[onCheckout]:::: ', success, payment);
    props.history.push('/checkout/complete', {
      payment,
      pickupEvent: orderingStatus.pickupEvent,
    });
  };

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     return await axios.get<IPickupEvent[]>(
  //       `${BASE_URL}/events?upcomingOnly=true`
  //     );
  //   };
  //   fetchEvents()
  //     .then((response: AxiosResponse<IPickupEvent[]>) => {
  //       logger.log('Upcoming Events:::: ', response.data);
  //       setUpcomingEvents(response.data);
  //     })
  //     .catch((err: any) => {
  //       logger.error('AdminPage.fetchUpcomingEvents', err);
  //     });
  // }, []);

  if (!orderingStatus.acceptingOrders) {
    return (
      <div className={styles.alertWrap}>
        <Alert type='danger' message={orderingStatus.message!} />
      </div>
    );
  }

  return (
    <div className={`${styles.checkoutPageWrap} responsive-container`}>
      <div className={`${styles.checkoutPageInner} ${styles.checkoutSection}`}>
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
            {/* <Button
              text='Select Location'
              isFullWidth={false}
              size='sm'
              onClick={() => setPickupEventOverlayOpen(true)}
            /> */}
          </div>
        </div>
        <div className={`${styles.paymentSection} ${styles.checkoutSection}`}>
          <div className='inner-border'></div>
          <div className={styles.checkoutSectionInner}>
            <h4>Payment</h4>
            <div className={styles.checkoutFormWrap}>
              <CheckoutForm onCheckout={onCheckout} />
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
      {/* <Overlay
        isOpen={pickupEventOverlayOpen}
        setIsOpen={setPickupEventOverlayOpen}
      >
        <div className={styles.upcomingEventsWrap}>
          <div className={styles.overlayBody}>
            {(upcomingEvents || []).map((event: IPickupEvent) => (
              <div
                key={event.location.name}
                className={`${styles.upcomingEventWrap}${
                  selectedPickupEvent === event ? ` ${styles.isSelected}` : ''
                }`}
                onClick={() => setPickupEvent(event)}
              >
                <PickupEventDisplay
                  pickupEvent={event}
                ></PickupEventDisplay>
              </div>
            ))}
          </div>
          <div className={styles.overlayFooter}>
            <Button
              text='OK'
              isDisabled={!selectedPickupEvent}
              onClick={() => setPickupEventOverlayOpen(false)}
            />
          </div>
        </div>
      </Overlay> */}
    </div>
  );
};
