import logo from '@assets/images/sonrisa_logo.jpg';
import { useOrdering } from '@core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faPhone,
  faShoppingCart,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { MutableRefObject, useState } from 'react';
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

const mobileNavOverlayVariants = {
  enter: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  center: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  exit: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
};

const mobileNavVariants = {
  enter: {
    x: '-100%',
    boxShadow: '0px 0px 0px 0px #aaaaaa',
  },
  center: {
    x: '0%',
    boxShadow: '5px 0px 50px 1px #aaaaaa',
  },
  exit: {
    x: '-100%',
    boxShadow: '0px 0px 0px 0px #aaaaaa',
  },
};

export const Header = ({
  showCart = true,
  setCartVisible,
  scrollRefs,
}: HeaderProps) => {
  const { currentOrder } = useOrdering();

  const location = useLocation();

  const history = useHistory();

  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const scrollToRef = (refName: 'ABOUT' | 'CONTACT') => {
    setMobileNavVisible(false);

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
              <button
                onClick={() => {
                  setMobileNavVisible(true);
                }}
              >
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
      <AnimatePresence>
        {mobileNavVisible && (
          <motion.div
            className={styles.mobileNavOverlay}
            initial="enter"
            animate="center"
            exit="exit"
            variants={mobileNavOverlayVariants}
            onClick={(e) => {
              if (
                (e.target as Element).classList.contains(
                  styles.mobileNavOverlay
                )
              ) {
                setMobileNavVisible(false);
              }
            }}
          >
            <motion.div
              className={styles.mobileNavWrap}
              initial="enter"
              animate="center"
              exit="exit"
              variants={mobileNavVariants}
              transition={{
                duration: 0.3,
                type: 'tween',
                ease: 'circOut',
              }}
            >
              <button
                className={styles.closeMobileNavBtn}
                onClick={() => setMobileNavVisible(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <span onClick={() => scrollToRef('ABOUT')}>About</span>
              <span onClick={() => scrollToRef('CONTACT')}>Contact</span>
              <a href="https://www.instagram.com/sonrisa.donuts/">
                <FontAwesomeIcon icon={faInstagram} />
                Instagram
              </a>
              <a href="tel:3308192592">
                <FontAwesomeIcon icon={faPhone} />
                (330) 819-2592
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
