import logo from '@assets/images/sonrisa_logo.jpg';
import { useOrdering } from '@core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faPhone,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MutableRefObject } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

type HeaderProps = {
  showCart?: boolean;

  setCartVisible: Dispatch<SetStateAction<boolean>>;

  scrollRefs: {
    ABOUT: MutableRefObject<HTMLElement>;

    CONTACT: MutableRefObject<HTMLElement>;
  };
};

export const Header = ({
  showCart = true,
  setCartVisible,
  scrollRefs,
}: HeaderProps) => {
  const { currentOrder } = useOrdering();

  const location = useLocation();

  const history = useHistory();

  const scrollToRef = (refName: 'ABOUT' | 'CONTACT') => {
    if (location.pathname !== '/') {
      history.push('/', { scrollTo: refName });
    }

    if (!scrollRefs || !scrollRefs[refName]) {
      return;
    }

    scrollRefs[refName].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`${styles.header} responsive-container`}>
      <div className={`${styles.headerInner}`}>
        <div className={styles.headerLogoWrap}>
          <Link to="/" className={styles.headerLogoLink}>
            <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
          </Link>
        </div>
        <div className={styles.headerSidesWrap}>
          <div className={styles.headerLeft}>
            <span className={styles.headerContentLg}>
              <a href="tel:3308192592">
                <FontAwesomeIcon icon={faPhone} />
              </a>
              <a href="https://www.instagram.com/sonrisa.donuts/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </span>
            <span className={styles.headerContentSm}>
              <button>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerContentLg}>
              <button
                className={styles.headerTextBtn}
                onClick={() => scrollToRef('ABOUT')}
              >
                About
              </button>
              <button
                className={styles.headerTextBtn}
                onClick={() => scrollToRef('CONTACT')}
              >
                Contact
              </button>
            </span>
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
