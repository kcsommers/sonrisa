import { Button, LoadingSpinner, OrderOverlay, Overlay } from '@components';
import { logger, useCatalog } from '@core';
import doughnutHalves from '@images/doughnut-halves.png';
import jing from '@images/jing.jpg';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CatalogObject } from '@square';
import { OrderBox } from '../../components/OrderBox/OrderBox';
import styles from './HomePage.module.scss';

export const HomePage = (props: RouteComponentProps) => {
  const { setCatalogObjects, catalogItems, catalogImageMap } = useCatalog();

  const [orderOverlayOpen, setOrderOverlayOpen] = useState(false);

  const [orderOverlayItem, setOrderOverlayItem] = useState<CatalogObject>();

  const openOverlay = (selectedItem: CatalogObject): void => {
    setOrderOverlayItem(selectedItem);
    setOrderOverlayOpen(true);
  };

  const closeOverlay = (): void => {
    setOrderOverlayItem(undefined);
    setOrderOverlayOpen(false);
  };

  // on init effect
  useEffect(() => {
    // set the catalog objects
    setCatalogObjects()
      .then((res) => logger.log('[Got menu]'))
      .catch((err) => logger.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Button text="Place an Order Online" isFullWidth={false} />
          </div>
          <img src={doughnutHalves} alt="Doughnut Half" />
        </div>
      </section>

      <section className={`${styles.menuSection} responsive-container`}>
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
                    imageUrl={catalogImageMap.get(item.imageId as string) || ''}
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
          <h3>Get in Touch</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className={styles.contactFormWrap}>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Email Address" />
            <textarea placeholder="Message" />
            <Button text="Submit" size="md" isFullWidth={false} />
          </div>
        </div>
      </section>
      <Overlay isOpen={orderOverlayOpen} onClose={closeOverlay}>
        <OrderOverlay item={orderOverlayItem as CatalogObject} />
      </Overlay>
    </div>
  );
};
