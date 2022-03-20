import styles from './AdminPage.module.scss';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { IPickupEvent } from '@sonrisa/core';
import { Button } from '../../components';
import 'react-datepicker/dist/react-datepicker.css';

export const AdminPage = () => {
  const [pendingEvent, setPendingEvent] = useState<IPickupEvent>();
  const [startDate, setStartDate] = useState(new Date());
  const [addingEvent, setAddingEvent] = useState<boolean>(false);

  const updateAddress = (key: string, value: string): void => {
    setPendingEvent((prevVal: IPickupEvent) => ({
      ...prevVal,
      location: {
        ...prevVal.location,
        address: {
          ...prevVal.location.address,
          [key]: value,
        },
      },
    }));
  };

  const updateLocationName = (name: string): void => {
    setPendingEvent((prevVal: IPickupEvent) => ({
      ...prevVal,
      location: {
        ...prevVal.location,
        name,
      },
    }));
  };

  const eventValid = (): boolean => {
    return !!(
      pendingEvent &&
      pendingEvent.endTime &&
      pendingEvent.startTime &&
      pendingEvent.location.name &&
      pendingEvent.location.address &&
      pendingEvent.location.address.city &&
      pendingEvent.location.address.state &&
      pendingEvent.location.address.street &&
      pendingEvent.location.address.zip
    );
  };

  const handleDateChange = (e) => {
    console.log('date chage:::: ', e);
    setStartDate(e);
  };

  return (
    <div className={styles.adminPageWrap}>
      <div className={styles.adminPageWrapInner}>
        <div className={styles.newEventWrap}>
          <h6>Add New Event</h6>
          <div className={styles.inputWrap}>
            <label htmlFor="location name">Location Name</label>
            <input
              type="text"
              name="location name"
              onChange={(e) => updateLocationName(e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="date">Date and Start Time</label>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              showTimeSelect={true}
              dateFormat="Pp"
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="street address">Street</label>
            <input
              type="text"
              name="street address"
              onChange={(e) => updateAddress('street', e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              onChange={(e) => updateAddress('city', e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              onChange={(e) => updateAddress('state', e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor="zip">Zip</label>
            <input
              type="number"
              name="zip"
              onChange={(e) => updateAddress('zip', e.target.value)}
            />
          </div>
        </div>
        <Button
          text="Add Event"
          isDisabled={!eventValid()}
          showSpinner={addingEvent}
        />
        <div className={styles.upcomingEventsWrap}>
          <h6>Upcoming Events</h6>
        </div>
      </div>
    </div>
  );
};
