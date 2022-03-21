import 'react-datepicker/dist/react-datepicker.css';
import { IPickupEvent } from '@sonrisa/core';
import { ReactNode, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { environments } from '../../../environments';
import {
  Button,
  LoadingSpinner,
  Overlay,
  SnackbarComponent,
} from '../../components';
import styles from './AdminPage.module.scss';
import axios, { AxiosResponse } from 'axios';
import { logger } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle,
  faExclamationCircle,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash';
import { useSnackbar } from '../../hooks';

const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;
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

export const AdminPage = () => {
  const [pendingEvent, setPendingEvent] = useState<IPickupEvent>({
    startTime: new Date(),
    endTime: new Date(),
    location: {
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    },
  });
  const [addingEvent, setAddingEvent] = useState<boolean>(false);
  const [upcomingEvents, setUpcomingEvents] = useState<IPickupEvent[]>();
  const [overlayTemplate, setOverlayTemplate] = useState<ReactNode>();
  const { snackbarConfig, snackbarVisible, setSnackbarVisible } = useSnackbar();

  const updateAddress = (key: string, value: string): void => {
    setPendingEvent((prevVal: IPickupEvent) => {
      return {
        ...prevVal,
        location: {
          ...prevVal.location,
          address: {
            ...prevVal.location.address,
            [key]: value,
          },
        },
      };
    });
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

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = () => {
    const fetchEvents = async () => {
      return await axios.get<IPickupEvent[]>(
        `${BASE_URL}/events?upcomingOnly=true`
      );
    };
    fetchEvents()
      .then((response: AxiosResponse<IPickupEvent[]>) => {
        logger.log('Upcoming Events:::: ', response.data);
        setUpcomingEvents(response.data);
      })
      .catch((err: any) => {
        logger.error('AdminPage.fetchUpcomingEvents', err);
      });
  };

  const eventValid = (): boolean => {
    return !!(
      pendingEvent &&
      pendingEvent.startTime &&
      pendingEvent.endTime &&
      pendingEvent.location.name &&
      pendingEvent.location.address &&
      pendingEvent.location.address.city &&
      pendingEvent.location.address.state &&
      pendingEvent.location.address.street &&
      pendingEvent.location.address.zip
    );
  };

  const updateStartTime = (date: Date) => {
    setPendingEvent((prevVal: IPickupEvent) => ({
      ...prevVal,
      startTime: date,
    }));
  };

  const updateEndTime = (date: Date) => {
    setPendingEvent((prevVal: IPickupEvent) => ({
      ...prevVal,
      endTime: date,
    }));
  };

  const addEvent = async () => {
    try {
      setAddingEvent(true);
      const path = pendingEvent._id ? 'update' : 'create';
      await axios.post<IPickupEvent>(
        `${BASE_URL}/events/${path}`,
        pendingEvent
      );
      setAddingEvent(false);
      setSnackbarVisible({
        message: `Event ${
          pendingEvent._id ? 'Updated' : 'Created'
        } Successfully`,
        icon: faCheckCircle as IconProp,
        iconColor: 'success',
        duration: 4000,
      });
      resetPendingEvent();
      fetchUpcomingEvents();
    } catch (err: any) {
      logger.error('AdminPage.addEvent', err);
      setAddingEvent(false);
      setSnackbarVisible({
        message: 'Error adding event. Please try again.',
        icon: faExclamationCircle as IconProp,
        iconColor: 'error',
        duration: 4000,
      });
    }
  };

  const resetPendingEvent = () => {
    setPendingEvent({
      startTime: new Date(),
      endTime: new Date(),
      location: {
        name: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
        },
      },
    });
  };

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

  const setOverlayOpen = (isOpen: boolean): void => {
    if (!isOpen) {
      setOverlayTemplate(undefined);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/events/${id}`);
      setOverlayTemplate(undefined);
      setSnackbarVisible({
        message: 'Event Deleted Successfully',
        icon: faCheckCircle as IconProp,
        iconColor: 'succes',
        duration: 4000,
      });
      fetchUpcomingEvents();
    } catch (error: any) {
      logger.error('AdminPage.deleteEvent', error);
      setOverlayTemplate(undefined);
      setSnackbarVisible({
        message: 'Error adding event. Please try again.',
        icon: faExclamationCircle as IconProp,
        iconColor: 'error',
        duration: 4000,
      });
    }
  };

  return (
    <div className={styles.adminPageWrap}>
      <div className={styles.adminPageWrapInner}>
        <div className={styles.newEventWrap}>
          <h6>Add New Event</h6>
          <div className={styles.inputWrap}>
            <label htmlFor='location name'>Location Name</label>
            <input
              type='text'
              name='location name'
              value={pendingEvent?.location?.name}
              onChange={(e) => updateLocationName(e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor='start time'>Start Time</label>
            <DatePicker
              selected={pendingEvent.startTime}
              onChange={updateStartTime}
              showTimeSelect={true}
              dateFormat='Pp'
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor='end time'>End Time</label>
            <DatePicker
              selected={pendingEvent.endTime}
              onChange={updateEndTime}
              showTimeSelect={true}
              dateFormat='Pp'
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor='street address'>Street</label>
            <input
              type='text'
              name='street address'
              value={pendingEvent?.location?.address.street}
              onChange={(e) => updateAddress('street', e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              name='city'
              value={pendingEvent?.location?.address.city}
              onChange={(e) => updateAddress('city', e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor='state'>State</label>
            <input
              type='text'
              name='state'
              value={pendingEvent?.location?.address.state}
              onChange={(e) => updateAddress('state', e.target.value)}
            />
          </div>
          <div className={styles.inputWrap}>
            <label htmlFor='zip'>Zip</label>
            <input
              type='number'
              name='zip'
              value={pendingEvent?.location?.address.zip}
              onChange={(e) => updateAddress('zip', e.target.value)}
            />
          </div>
          <Button
            text={pendingEvent._id ? 'Update Event' : 'Add Event'}
            isDisabled={!eventValid()}
            showSpinner={addingEvent}
            onClick={addEvent}
          />
        </div>

        <div className={styles.upcomingEventsWrap}>
          <h6>Upcoming Events</h6>
          {upcomingEvents ? (
            upcomingEvents.map((event: IPickupEvent) => (
              <div key={event._id} className={styles.upcomingEventWrap}>
                <div key={event._id} className={styles.upcomingEventWrapInner}>
                  <h4>{getDateString(event.startTime)}</h4>
                  <p>{event.location.name}</p>
                  <div>
                    {getTimeString(event.startTime)} -{' '}
                    {getTimeString(event.endTime)}
                  </div>
                  <span className={styles.viewOrders}>View Orders</span>
                </div>
                <div className={styles.eventControlsWrap}>
                  <FontAwesomeIcon
                    icon={faPen as IconProp}
                    onClick={() => {
                      const clonedEvent = cloneDeep(event);
                      clonedEvent.startTime = new Date(event.startTime);
                      clonedEvent.endTime = new Date(event.endTime);
                      setPendingEvent(clonedEvent);
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash as IconProp}
                    color='#cc0023'
                    onClick={() => {
                      setOverlayTemplate(
                        <div className={styles.confirmDeleteWrap}>
                          <h4>Delete This Event?</h4>
                          <div className={styles.confirmDeleteBtnsWrap}>
                            <Button
                              text='OK'
                              onClick={() => deleteEvent(event._id)}
                            />
                            <Button
                              text='Cancel'
                              onClick={() => setOverlayOpen(false)}
                            />
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.spinnerWrap}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
      <Overlay isOpen={!!overlayTemplate} setIsOpen={setOverlayOpen}>
        {overlayTemplate}
      </Overlay>
      <SnackbarComponent isVisible={snackbarVisible} config={snackbarConfig} />
    </div>
  );
};
