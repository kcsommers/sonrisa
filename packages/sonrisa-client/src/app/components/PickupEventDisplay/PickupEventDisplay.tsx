import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPickupEvent, DateHelper } from '@sonrisa/core';
import styles from './PickupEventDisplay.module.scss';

interface IPickupEventDisplayProps {
  pickupEvent: IPickupEvent;
  showControls?: boolean;
  showAddress?: boolean;
  useCard?: boolean;
  pickupEventSelected?: (pickupEvent: IPickupEvent) => void;
  pickupEventDeleted?: (pickupEvent: IPickupEvent) => void;
}

export const PickupEventDisplay = ({
  pickupEvent,
  showControls,
  showAddress,
  useCard = true,
  pickupEventDeleted,
  pickupEventSelected,
}: IPickupEventDisplayProps) => {
  return (
    <div
      key={pickupEvent._id}
      className={`${styles.upcomingEventWrap}${
        useCard ? ` ${styles.useCard}` : ''
      }`}
    >
      <div key={pickupEvent._id} className={styles.upcomingEventWrapInner}>
        <h4>{DateHelper.getDateString(pickupEvent.startTime)}</h4>
        <div>
          {DateHelper.getTimeString(pickupEvent.startTime)} -{' '}
          {DateHelper.getTimeString(pickupEvent.endTime)}
        </div>
        <p>{pickupEvent.location.name}</p>
        {showAddress && (
          <div className={styles.addressWrap}>
            <p>{pickupEvent.location.address.street}</p>
            <p>
              {pickupEvent.location.address.city},{' '}
              {pickupEvent.location.address.state}{' '}
              {pickupEvent.location.address.zip}
            </p>
          </div>
        )}

        {showControls && <span className={styles.viewOrders}>View Orders</span>}
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
    </div>
  );
};
