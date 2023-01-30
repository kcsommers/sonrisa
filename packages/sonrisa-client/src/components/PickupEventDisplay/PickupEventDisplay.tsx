import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateHelper, IPickupEvent } from '@sonrisa/core';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { environments } from '../../environments';
import { logger } from '../../utils';
import { Overlay } from '../Overlay/Overlay';
import styles from './PickupEventDisplay.module.scss';

interface IPickupEventDisplayProps {
  pickupEvent: IPickupEvent;
  showControls?: boolean;
  useCard?: boolean;
  pickupEventUpdated?: (pickupEvent: IPickupEvent) => void;
  pickupEventSelected?: (pickupEvent: IPickupEvent) => void;
  pickupEventDeleted?: (pickupEvent: IPickupEvent) => void;
}

const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;

export const PickupEventDisplay = ({
  pickupEvent,
  showControls,
  useCard = true,
  pickupEventDeleted,
  pickupEventSelected,
  pickupEventUpdated,
}: IPickupEventDisplayProps) => {
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);

  const soldOutToggled = async (soldOut: boolean) => {
    const prevVal = pickupEvent?.soldOut;
    try {
      pickupEvent.soldOut = soldOut;
      const updatedEvent = await axios.post(
        `${BASE_URL}/events/update/${pickupEvent?._id}`,
        {
          soldOut,
        }
      );
      pickupEventUpdated && pickupEventUpdated(updatedEvent.data);
    } catch (error: any) {
      logger.error('PickupEventDisplay.soldOutToggled', error);
      pickupEvent.soldOut = prevVal;
    }
  };
  return (
    <div
      className={`${styles.upcomingEventWrap}${
        useCard ? ` ${styles.useCard}` : ''
      }`}
    >
      {!showControls && pickupEvent?.soldOut && (
        <div className={styles.soldOutOverlay}>Sold Out</div>
      )}
      <div key={pickupEvent?._id} className={styles.upcomingEventWrapInner}>
        <h4>{DateHelper.getDateString(pickupEvent?.startTime)}</h4>
        <div>
          {DateHelper.getTimeString(pickupEvent?.startTime)} -{' '}
          {DateHelper.getTimeString(pickupEvent?.endTime)}
        </div>
        <p className={styles.locationName}>{pickupEvent?.location.name}</p>
        <a
          className={styles.addressWrap}
          href={`https://maps.google.com/?q=${pickupEvent?.location.address.street}, ${pickupEvent?.location.address.city}, ${pickupEvent?.location.address.state}, ${pickupEvent?.location.address.zip}`}
          target='_blank'
        >
          <p>{pickupEvent?.location.address.street}</p>
          <p>
            {pickupEvent?.location.address.city},{' '}
            {pickupEvent?.location.address.state}{' '}
            {pickupEvent?.location.address.zip}
          </p>
        </a>
        {showControls && (
          <>
            <label className={styles.soldOutToggleWrap}>
              <span>Sold Out</span>
              <div className={styles.switch}>
                <input
                  type='checkbox'
                  id={`toggleAll-${pickupEvent?._id}`}
                  checked={pickupEvent?.soldOut}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    soldOutToggled(e.target.checked);
                  }}
                />
                <label htmlFor={`toggleAll-${pickupEvent?._id}`}></label>
              </div>
            </label>
            <div
              className={styles.viewOrders}
              style={{
                cursor: (pickupEvent?.orders || []).length
                  ? 'pointer'
                  : 'initial',
              }}
              onClick={() =>
                (pickupEvent?.orders || []).length && setOverlayOpen(true)
              }
            >
              {(pickupEvent?.orders || []).length} Order
              {(pickupEvent?.orders || []).length !== 1 && 's'}
            </div>
          </>
        )}
      </div>
      {showControls && (
        <div className={styles.eventControlsWrap}>
          <FontAwesomeIcon
            icon={faPen as IconProp}
            onClick={() => pickupEventSelected(pickupEvent)}
          />
          <FontAwesomeIcon
            icon={faTrash as IconProp}
            color='#cc0023'
            onClick={() => pickupEventDeleted(pickupEvent)}
          />
        </div>
      )}
      <Overlay isOpen={overlayOpen} setIsOpen={setOverlayOpen}>
        <div className={styles.ordersWrap}>
          <h6>Order Links</h6>
          {pickupEvent?.orders.map((orderId: string) => (
            <a
              href={`${
                environments[process.env.NODE_ENV].SQUARE_ORDERS_BASE_URL
              }/${orderId}`}
              target='_blank'
              key={orderId}
              className={styles.orderIdWrap}
            >
              <p>{orderId}</p>
            </a>
          ))}
        </div>
      </Overlay>
    </div>
  );
};
