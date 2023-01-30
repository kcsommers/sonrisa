import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useOrdering } from '../context/ordering/use-ordering';
import { useSnackbar } from '../hooks/use-snackbar';
import { Alert } from '../components/Alert/Alert';
import { Button } from '../components/Button/Button';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { InstagramFeed } from '../components/InstagramFeed/InstagramFeed';
import { Menu } from '../components/Menu/Menu';
import { PickupEventDisplay } from '../components/PickupEventDisplay';
import { SnackbarComponent } from '../components/Snackbar/SnackbarComponent';
import styles from './HomePage.module.scss';
import { ScrollRefNames } from './scroll-ref-names';

type HomePageProps = {
  setScrollRef: (elName: string, el: HTMLElement) => void;
  setCartVisible: (isVisible: boolean) => void;
};

export default ({ setScrollRef, setCartVisible }: HomePageProps) => {
  const { snackbarConfig, snackbarVisible, setSnackbarVisible } = useSnackbar();
  const aboutRef = useRef<HTMLElement>();
  const contactRef = useRef<HTMLElement>();
  const orderSectionRef = useRef<HTMLElement | null>();
  const photosSectionRef = useRef<HTMLElement | null>();
  const { orderingStatus } = useOrdering();

  console.log('ordering:::: ', orderingStatus);

  const contactFormSubmitted = (success: boolean) => {
    setSnackbarVisible(
      success
        ? ({
            message: 'Your message has been sent!',
            icon: faCheckCircle,
            iconColor: 'success',
            duration: 4000,
          } as any)
        : ({
            message: 'Error sending message. Please try again.',
            icon: faExclamationCircle,
            iconColor: 'error',
            duration: 4000,
          } as any)
    );
  };

  const onOrderUpdate = (success: boolean) => {
    setSnackbarVisible(
      success
        ? ({
            message: 'Cart Updated',
            icon: faCheckCircle,
            iconColor: 'success',
            duration: 4000,
            onClick: setCartVisible.bind(this, true),
          } as any)
        : ({
            message: 'Error Updating Cart',
            icon: faExclamationCircle,
            iconColor: 'error',
            duration: 4000,
          } as any)
    );
  };

  // useEffect(() => {
  //   if (location.state && (location.state as any).scrollTo) {
  //     switch ((location.state as any).scrollTo) {
  //       case ScrollRefNames.ABOUT: {
  //         if (aboutRef.current) {
  //           aboutRef.current.scrollIntoView();
  //         }
  //         return;
  //       }
  //       case ScrollRefNames.CONTACT: {
  //         if (contactRef.current) {
  //           contactRef.current.scrollIntoView();
  //         }
  //         return;
  //       }
  //       case ScrollRefNames.ORDER: {
  //         if (orderSectionRef.current) {
  //           orderSectionRef.current.scrollIntoView();
  //         }
  //         return;
  //       }
  //       case ScrollRefNames.PHOTOS: {
  //         if (photosSectionRef.current) {
  //           photosSectionRef.current.scrollIntoView();
  //         }
  //         return;
  //       }
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className={styles.homePageWrap}>
      <section className={`${styles.landingSection} responsive-container`}>
        <div className={`${styles.landingInner}`}>
          <div className='inner-border'></div>
          <div className={`${styles.landingCta} responsive-container-inner`}>
            <h3>
              Handmade Brioche Donuts. Fresh and Local Ingredients. Made in
              Seattle, WA.
            </h3>
            <Button
              text='Order Now'
              isFullWidth={false}
              onClick={() => {
                orderSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
          <img src='/assets/images/doughnut-halves.png' alt='Doughnut Half' />
        </div>
      </section>
      <section className={`${styles.introSection} responsive-container`}>
        <div className={styles.introSectionInner}>
          <p>
            <span>Sonrisa donuts</span>&nbsp; are always made fresh to order
            using the highest quality organic ingredients- including sunflower
            oil, hand rolled brioche dough and a variety of unique, delicious
            fillings.
          </p>
        </div>
      </section>
      <section
        className={`${styles.menuSection} responsive-container`}
        ref={(el) => {
          orderSectionRef.current = el as HTMLElement;
          // setScrollRef('ORDER', el as HTMLElement);
        }}
      >
        <h3>Online Ordering</h3>

        {orderingStatus?.acceptingOrders ? (
          orderingStatus.pickupEvent && (
            <div className={`${styles.pickupEventWrap}`}>
              <p>
                <FontAwesomeIcon icon={faInfoCircle as IconProp} />
                Taking orders for the following date and location:
              </p>
              <div className={styles.pickupEventWrapInner}>
                <PickupEventDisplay
                  pickupEvent={orderingStatus.pickupEvent}
                  useCard={false}
                  showControls={false}
                />
              </div>
            </div>
          )
        ) : (
          <div className={styles.alertWrap}>
            <Alert type='danger' message={orderingStatus?.message!} />
          </div>
        )}
        <Menu onOrderUpdate={onOrderUpdate} />
      </section>
      <section
        className={`${styles.aboutSection} responsive-container`}
        ref={(el) => {
          aboutRef.current = el as HTMLElement;
          // setScrollRef('ABOUT', el as HTMLElement);
        }}
      >
        <span className={styles.aboutImgWrap}>
          <img src='/assets/images/jing.jpg' alt='Jing' />
        </span>
        <div className={`${styles.bioWrap}`}>
          <div className='inner-border'></div>
          <div className={`${styles.bioInner} max-1280`}>
            <div className={`${styles.taglineWrap}`}>
              <h3>Sonrisa</h3>
              <p>Smile. A gesture of joy, happiness or pleasure</p>
            </div>
            <p>
              Hello! Welcome to Sonrisa Donuts! My name is Jing, I am a chef
              from Thailand. I moved to Seattle in 2018 to join the city's
              culinary scene, and started Sonrisa during the height of the 2020
              pandemic. I have always loved eating donuts, and during that time
              it brought me joy to create and perfect my own recipes using
              organic, local ingredients from Washington. Sonrisa is the Spanish
              word for smile, and represents the joy that constantly fills my
              kitchen. I love seeing smiles on the faces of people who have my
              food. Especially my donuts!
              <br />
              <br />
              Growing up in Thailand I learned to cook with my grandmother and
              my mom, and have been curious about anything involving food ever
              since. I was a student of Kitchen and Restaurant Management for 4
              years, receiving a Bachelor's degree while competing in culinary
              competitions. In 2012 I even had the opportunity to compete as a
              member of the Thailand Team in the IKA Culinary Olympics in
              Erfurt, Germany, which was a life changing experience! When I’m
              not cooking, I’m usually watching cooking shows or taking more
              cooking classes.
              <br />
              <br />
              Thank you so much for stopping by and shopping local! I hope my
              sonrisa brings you sonrisa!
            </p>
            <div className={styles.bioImagesWrap}>
              <span>
                <img
                  src='https://res.cloudinary.com/kcsommers/image/upload/v1626325477/Sonrisa/thai-olympics-2.jpg'
                  alt='Thai Olympic Team 1'
                />
              </span>
              <span>
                <img
                  src='https://res.cloudinary.com/kcsommers/image/upload/v1626325476/Sonrisa/thai-olympics-3.jpg'
                  alt='Thai Olympic Team 1'
                />
              </span>
              <span>
                <img
                  src='https://res.cloudinary.com/kcsommers/image/upload/v1626325476/Sonrisa/thai-olympics-1.jpg'
                  alt='Thai Olympic Team 4'
                />
              </span>
              <span>
                <img
                  src='https://res.cloudinary.com/kcsommers/image/upload/v1626325476/Sonrisa/thai-olympics-4.jpg'
                  alt='Thai Olympic Team 3'
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.contactSection} responsive-container`}
        ref={(el) => {
          contactRef.current = el as HTMLElement;
          // setScrollRef('CONTACT', el as HTMLElement);
        }}
      >
        <div className='max-1280'>
          <ContactForm formSubmitted={contactFormSubmitted} />
        </div>
      </section>

      <section
        className={styles.instagramFeedSection}
        ref={(el) => {
          photosSectionRef.current = el as HTMLElement;
          // setScrollRef('PHOTOS', el as HTMLElement);
        }}
      >
        <div className={styles.instagramFeedSectionInner}>
          <InstagramFeed />
        </div>
      </section>
      <SnackbarComponent isVisible={snackbarVisible} config={snackbarConfig} />
    </div>
  );
};
