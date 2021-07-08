import {
  Button,
  ContactForm,
  InstagramFeed,
  LoadingSpinner,
  SnackbarComponent,
} from '@components';
import { getItemVariationId, useCatalog, useSnackbar } from '@core';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import doughnutHalves from '@images/doughnut-halves.png';
import jing from '@images/jing.jpg';
import { useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { OrderBox } from '../../components/OrderBox/OrderBox';
import styles from './HomePage.module.scss';

interface HomePageProps extends RouteComponentProps {
  setCartVisible: Dispatch<SetStateAction<boolean>>;
}

export const HomePage = (props: HomePageProps) => {
  const { snackbarConfig, snackbarVisible, setSnackbarVisible } = useSnackbar();

  const { catalogItems, catalogImageMap } = useCatalog();

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
          }
        : {
            message: 'Error Updating Cart',
            icon: faExclamationCircle,
            iconColor: 'error',
            duration: 4000,
          }
    );
  };

  return (
    <div className={styles.homePageWrap}>
      <section className={`${styles.landingSection} responsive-container`}>
        <div className={`${styles.landingInner}`}>
          <div className={styles.landingInnerBorder}></div>
          <div className={styles.landingCta}>
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
        ref={(el) => (orderSectionRef.current = el)}
      >
        <p className={`${styles.menuSectionText}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          architecto ipsam placeat fuga animi aperiam.
        </p>
        <div className={`${styles.orderBoxesWrap}`}>
          <h3>Menu</h3>
          {catalogItems && catalogItems.length ? (
            <div className={styles.orderBoxesInner}>
              {catalogItems.map((item) => (
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
            </div>
          ) : (
            <div className={styles.loadingWrap}>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </section>

      <section className={`${styles.specialsSection} responsive-container`}>
        <h3>Specials</h3>
        <span>*Rotating specials coming soon!</span>
      </section>

      <section className={`${styles.aboutSection} responsive-container`}>
        <span className={styles.aboutImgWrap}>
          <img src={jing} alt="Jing" />
        </span>

        <div className={`${styles.bioWrap}`}>
          <div className={styles.bioWrapBorder}></div>
          <div className="max-1280">
            <h3>Hello!</h3>
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
          </div>
        </div>
      </section>

      <section className={`${styles.contactSection} responsive-container`}>
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
