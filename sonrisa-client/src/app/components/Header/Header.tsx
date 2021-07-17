import logo from '@assets/images/sonrisa_logo.jpg';
import { useOrdering } from '@core';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faPhone,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

type HeaderProps = {
  logoSize?: 'sm' | 'lg';

  showCart?: boolean;

  setCartVisible: Dispatch<SetStateAction<boolean>>;

  scrollRefs?: {
    about: HTMLElement;

    contact: HTMLElement;
  };
};

export const Header = ({
  logoSize = 'lg',
  showCart = true,
  setCartVisible,
  scrollRefs,
}: HeaderProps) => {
  const { currentOrder } = useOrdering();

  const scrollToRef = (refName: 'about' | 'contact') => {
    if (!scrollRefs || !scrollRefs[refName]) {
      return;
    }

    scrollRefs[refName].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`${styles.header} responsive-container`}>
      <div className={`${styles.headerInner}`}>
        <div
          className={`${styles.headerLogoWrap} ${
            styles[`headerLogo-${logoSize}`]
          }`}
        >
          <Link to="/" className={styles.headerLogoLink}>
            <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
          </Link>
        </div>
        <div className={styles.headerSidesWrap}>
          <div className={styles.headerLeft}>
            <div className={styles.headerLg}>
              <a>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="tel:3308192592">
                <FontAwesomeIcon icon={faPhone} />
              </a>
              <a href="https://www.instagram.com/sonrisa.donuts/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div className={styles.headerSm}>
              <button>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
          <div className={styles.headerRight}>
            <button
              className={styles.headerTextBtn}
              onClick={() => scrollToRef('about')}
            >
              About
            </button>
            <button
              className={styles.headerTextBtn}
              onClick={() => scrollToRef('contact')}
            >
              Contact
            </button>
            {showCart && (
              <button
                className={styles.cartBtn}
                onClick={() => setCartVisible(true)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {currentOrder &&
                currentOrder.lineItems &&
                currentOrder.lineItems.length ? (
                  <span>{currentOrder.lineItems.length}</span>
                ) : null}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
