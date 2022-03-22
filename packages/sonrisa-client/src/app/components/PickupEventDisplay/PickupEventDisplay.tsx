import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPickupEvent } from '@sonrisa/core';
import { cloneDeep } from 'lodash';
import styles from './PickupEventDisplay.module.scss';

const MONTHS_ABREVIATED: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DAYS_ABREVIATED: string[] = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const getDateString = (date: Date): string => {
  const dateModel = new Date(date);
  const day = dateModel.getDay();
  const month = dateModel.getMonth();
  const dateNum = dateModel.getDate();
  const year = dateModel.getFullYear();
  return `${DAYS_ABREVIATED[day]} ${MONTHS_ABREVIATED[month]} ${dateNum}, ${year}`;
};

const getTimeString = (date: Date): string => {
  const dateModel = new Date(date);
  let hour = dateModel.getHours();
  const mins = dateModel.getMinutes();
  let amPm = 'AM';
  if (hour > 12) {
    hour -= 12;
    amPm = 'PM';
  }
  return `${hour}:${mins < 10 ? `0${mins}` : mins} ${amPm}`;
};

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
        <h4>{getDateString(pickupEvent.startTime)}</h4>
        <div>
          {getTimeString(pickupEvent.startTime)} -{' '}
          {getTimeString(pickupEvent.endTime)}
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
