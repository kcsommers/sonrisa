import {
  Button,
  ContactForm,
  InstagramFeed,
  LoadingSpinner,
  SnackbarComponent,
  Alert,
} from '@components';
import {
  getItemVariationId,
  ScrollRefNames,
  useCatalog,
  useOrdering,
  useSnackbar,
} from '@core';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import doughnutHalves from '@images/doughnut-halves.png';
import jing from '@images/jing.jpg';
import { RouteComponentProps } from 'react-router-dom';
import { OrderBox } from '../../components/OrderBox/OrderBox';
import styles from './HomePage.module.scss';
import { useEffect, useRef } from 'react';

interface HomePageProps extends RouteComponentProps {
  setScrollRef: (elName: string, el: HTMLElement) => void;

  setCartVisible: (isVisible: boolean) => void;
}

export const HomePage = ({
  setScrollRef,
  location,
  setCartVisible,
}: HomePageProps) => {
  const { snackbarConfig, snackbarVisible, setSnackbarVisible } = useSnackbar();

  const { mainCatalogItems, specialsCatalogItems, catalogImageMap } =
    useCatalog();

  const { acceptingOrders } = useOrdering();

  const aboutRef = useRef<HTMLElement>();

  const contactRef = useRef<HTMLElement>();

  const orderSectionRef = useRef<HTMLElement | null>();

  const contactFormSubmitted = (success: boolean) => {
    setSnackbarVisible(
      success
        ? {
            message: 'Your message has been sent!',
            icon: faCheckCircle,
            iconColor: 'success',
            duration: 4000,
          }
        : {
            message: 'Error sending message. Please try again.',
            icon: faExclamationCircle,
            iconColor: 'error',
            duration: 4000,
          }
    );
  };

  const onOrderUpdate = (success: boolean) => {
    setSnackbarVisible(
      success
        ? {
            message: 'Cart Updated',
            icon: faCheckCircle,
            iconColor: 'success',
            duration: 4000,
            onClick: setCartVisible.bind(this, true),
          }
        : {
            message: 'Error Updating Cart',
            icon: faExclamationCircle,
            iconColor: 'error',
            duration: 4000,
          }
    );
  };

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      switch ((location.state as any).scrollTo) {
        case ScrollRefNames.ABOUT: {
          if (aboutRef.current) {
            aboutRef.current.scrollIntoView();
          }
          return;
        }
        case ScrollRefNames.CONTACT: {
          if (contactRef.current) {
            contactRef.current.scrollIntoView();
          }
          return;
        }
        case ScrollRefNames.ORDER: {
          if (orderSectionRef.current) {
            orderSectionRef.current.scrollIntoView();
          }
          return;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.homePageWrap}>
      <section className={`${styles.landingSection} responsive-container`}>
        <div className={`${styles.landingInner}`}>
          <div className="inner-border"></div>
          <div className={`${styles.landingCta} responsive-container-inner`}>
            <h3>
              Handmade Brioche Donuts. Fresh and Local Ingredients. Made in
              Seattle, WA.
            </h3>
            <Button
              text="Place an Order Online"
              isFullWidth={false}
              onClick={() => {
                orderSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
          <img src={doughnutHalves} alt="Doughnut Half" />
        </div>
      </section>
      <section
        className={`${styles.menuSection} responsive-container`}
        ref={(el) => {
          orderSectionRef.current = el as HTMLElement;
          setScrollRef('ORDER', el as HTMLElement);
        }}
      >
        <p className={`${styles.menuSectionText}`}>
          Taking orders Tuesday - Saturday, or until sold out. Pick up Monday
          between 1 and 4. Pickup instructions will be sent via email.
        </p>
        <div className={`${styles.orderBoxesWrap}`}>
          <h3>Menu</h3>
          {!acceptingOrders && (
            <div className={styles.alertWrap}>
              <Alert
                type="danger"
                message={
                  'Sorry we are no longer accepting orders this week. Please check back on Tuesday!'
                }
              />
            </div>
          )}
          {mainCatalogItems && mainCatalogItems.length ? (
            <div className={styles.orderBoxesInner}>
              {mainCatalogItems.map((item) => (
                <div key={item.id} className={styles.orderBoxWrap}>
                  <OrderBox
                    item={item}
                    onOrderUpdate={onOrderUpdate}
                    imageUrl={
                      catalogImageMap[
                        getItemVariationId(item) as string
                      ]?.[0] || ''
                    }
                  />
                </div>
              ))}
              {specialsCatalogItems.map((item) => (
                <div key={item.id} className={styles.orderBoxWrap}>
                  <OrderBox
                    item={item}
                    isSpecialsItem={true}
                    onOrderUpdate={onOrderUpdate}
                    imageUrl={
                      catalogImageMap[
                        getItemVariationId(item) as string
                      ]?.[0] || ''
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.loadingWrap}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </section>

      <section
        className={`${styles.aboutSection} responsive-container`}
        ref={(el) => {
          aboutRef.current = el as HTMLElement;
          setScrollRef('ABOUT', el as HTMLElement);
        }}
      >
        <span className={styles.aboutImgWrap}>
          <img src={jing} alt="Jing" />
        </span>
        <div className={`${styles.bioWrap}`}>
          <div className="inner-border"></div>
          <div className="max-1280">
            <div className={`${styles.taglineWrap}`}>
              <h3>Sonrisa</h3>
              <p>Smile. A gesture of joy, happiness or pleasure</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              molestiae voluptatem est corrupti cumque minima nostrum cupiditate
              tempore fuga eveniet aut ipsum, ex nulla aperiam facere blanditiis
              adipisci, at et! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Officia molestiae voluptatem est corrupti cumque
              minima nostrum cupiditate tempore fuga eveniet aut ipsum, ex nulla
              aperiam facere blanditiis adipisci, at et!
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              molestiae voluptatem est corrupti cumque minima nostrum cupiditate
              tempore fuga eveniet aut ipsum, ex nulla aperiam facere blanditiis
              adipisci, at et! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Officia molestiae voluptatem est corrupti cumque
              minima nostrum cupiditate tempore fuga eveniet aut ipsum, ex nulla
              aperiam facere blanditiis adipisci, at et!
            </p>
            <div className={styles.bioImagesWrap}>
              <span>
                <img
                  src="https://res.cloudinary.com/kcsommers/image/upload/v1626325477/Sonrisa/thai-olympics-2.jpg"
                  alt="Thai Olympic Team 1"
                />
              </span>
              <span>
                <img
                  src="https://res.cloudinary.com/kcsommers/image/upload/v1626325476/Sonrisa/thai-olympics-3.jpg"
                  alt="Thai Olympic Team 1"
                />
              </span>
              <span>
                <img
                  src="https://res.cloudinary.com/kcsommers/image/upload/v1626325476/Sonrisa/thai-olympics-1.jpg"
                  alt="Thai Olympic Team 4"
                />
              </span>
              <span>
                <img
                  src="https://res.cloudinary.com/kcsommers/image/upload/v1626325476/Sonrisa/thai-olympics-4.jpg"
                  alt="Thai Olympic Team 3"
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
          setScrollRef('CONTACT', el as HTMLElement);
        }}
      >
        <div className="max-1280">
          <ContactForm formSubmitted={contactFormSubmitted} />
        </div>
      </section>

      <section className={styles.instagramFeedSection}>
        <div className={styles.instagramFeedSectionInner}>
          <InstagramFeed />
        </div>
      </section>
      <SnackbarComponent isVisible={snackbarVisible} config={snackbarConfig} />
    </div>
  );
};
