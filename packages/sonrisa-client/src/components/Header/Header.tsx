import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faBars,
  faPhone,
  faShoppingCart,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { MutableRefObject, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useOrdering } from '../../context';
import styles from './Header.module.scss';
import Link from 'next/link';

type HeaderProps = {
  showCart?: boolean;
  setCartVisible: Dispatch<SetStateAction<boolean>>;
  scrollRefs?: {
    [refName: string]: MutableRefObject<HTMLElement>;
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
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.24)',
  },
  center: {
    x: '0%',
    boxShadow: '5px 0px 50px 1px rgba(0, 0, 0, 0.24)',
  },
  exit: {
    x: '-100%',
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.24)',
  },
};

export const Header = ({
  showCart = true,
  setCartVisible,
  scrollRefs,
}: HeaderProps) => {
  const { currentOrder } = useOrdering();
  const router = useRouter();
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const scrollToRef = (refName: string) => {
    setMobileNavVisible(false);
    let newPath = router.pathname !== '/' ? '/' : '';
    router.push(`${newPath}#${refName.toLowerCase()}`);
    if (scrollRefs && scrollRefs[refName] && scrollRefs[refName].current) {
      scrollRefs[refName].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    body.style.overflow = mobileNavVisible ? 'hidden' : 'auto';
  }, [mobileNavVisible]);

  return (
    <header className={`${styles.header} responsive-container`}>
      <div className={`${styles.headerInner}`}>
        <div className={styles.headerLogoWrap}>
          <Link href='/' className={styles.headerLogoLink}>
            <img
              className={styles.logo}
              src='/assets/images/sonrisa_logo.jpg'
              alt='Sonrisa Logo'
            />
          </Link>
        </div>
        <div className={styles.headerSidesWrap}>
          <div className={styles.headerLeft}>
            <span className={styles.headerContentLg}>
              <a href='tel:2534595365'>
                <FontAwesomeIcon icon={faPhone as IconProp} />
              </a>
              <a href='https://www.instagram.com/sonrisa.donuts/'>
                <FontAwesomeIcon icon={faInstagram as IconProp} />
              </a>
            </span>
            <span className={styles.headerContentSm}>
              <button
                onClick={() => {
                  setMobileNavVisible(true);
                }}
              >
                <FontAwesomeIcon icon={faBars as IconProp} />
              </button>
            </span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerContentLg}>
              <button
                className={styles.headerTextBtn}
                onClick={() => scrollToRef('ORDER')}
              >
                Order
              </button>
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
              <button
                className={styles.headerTextBtn}
                onClick={() => scrollToRef('PHOTOS')}
              >
                Photos
              </button>
            </span>
            {showCart && (
              <button
                className={styles.cartBtn}
                onClick={() => setCartVisible(true)}
              >
                <FontAwesomeIcon icon={faShoppingCart as IconProp} />
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
            initial='enter'
            animate='center'
            exit='exit'
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
              initial='enter'
              animate='center'
              exit='exit'
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
                <FontAwesomeIcon icon={faTimes as IconProp} />
              </button>
              <span onClick={() => scrollToRef('ORDER')}>Order</span>
              <span onClick={() => scrollToRef('ABOUT')}>About</span>
              <span onClick={() => scrollToRef('CONTACT')}>Contact</span>
              <span onClick={() => scrollToRef('PHOTOS')}>Photos</span>
              <a href='https://www.instagram.com/sonrisa.donuts/'>
                <FontAwesomeIcon icon={faInstagram as IconProp} />
                Instagram
              </a>
              <a href='tel:2534595365'>
                <FontAwesomeIcon icon={faPhone as IconProp} />
                (253) 459-5365
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
