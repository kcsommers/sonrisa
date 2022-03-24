import 'react-datepicker/dist/react-datepicker.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { IPickupEvent } from '@sonrisa/core';
import axios, { AxiosResponse } from 'axios';
import { cloneDeep } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { environments } from '../../../environments';
import {
  Button,
  LoadingSpinner,
  Overlay,
  PickupEventDisplay,
  SnackbarComponent,
} from '../../components';
import { useSnackbar } from '../../hooks';
import { logger } from '../../utils';
import styles from './AdminPage.module.scss';

const BASE_URL = environments[process.env.NODE_ENV].API_BASE_URL;

export const AdminPage = () => {
  const [pendingEvent, setPendingEvent] = useState<IPickupEvent>({
    startTime: new Date(),
    endTime: new Date(),
    orders: [],
    soldOut: false,
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
      const path = pendingEvent._id ? `update/${pendingEvent._id}` : 'create';
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
      orders: [],
      soldOut: false,
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
        iconColor: 'success',
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
          <h6 style={{ marginBottom: '1rem' }}>Upcoming Events</h6>
          {upcomingEvents ? (
            upcomingEvents.map((event: IPickupEvent) => (
              <div key={event._id} style={{ marginBottom: '1rem' }}>
                <PickupEventDisplay
                  pickupEvent={event}
                  showControls={true}
                  pickupEventUpdated={(updatedEvent: IPickupEvent) => {
                    setUpcomingEvents((prevEvents: IPickupEvent[]) => {
                      const clonedEvents = cloneDeep(prevEvents);
                      const prevIndex: number = prevEvents.findIndex(
                        (e) => e._id === updatedEvent._id
                      );
                      if (prevIndex > -1) {
                        clonedEvents.splice(prevIndex, 1, updatedEvent);
                      }
                      return clonedEvents;
                    });
                  }}
                  pickupEventSelected={(pickupEvent: IPickupEvent) => {
                    const clonedEvent = cloneDeep(pickupEvent);
                    clonedEvent.startTime = new Date(pickupEvent.startTime);
                    clonedEvent.endTime = new Date(pickupEvent.endTime);
                    setPendingEvent(clonedEvent);
                  }}
                  pickupEventDeleted={(pickupEvent) => {
                    setOverlayTemplate(
                      <div className={styles.confirmDeleteWrap}>
                        <h4>Delete This Event?</h4>
                        <div className={styles.confirmDeleteBtnsWrap}>
                          <Button
                            text='OK'
                            onClick={() => deleteEvent(pickupEvent._id)}
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
