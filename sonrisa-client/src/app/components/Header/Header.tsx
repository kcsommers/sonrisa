import logo from '@assets/images/sonrisa_logo.jpg';
import { useOrdering } from '@core';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

type HeaderProps = {
  logoSize?: 'sm' | 'lg';

  showCart?: boolean;

  setCartVisible: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({
  logoSize = 'lg',
  showCart = true,
  setCartVisible,
}: HeaderProps) => {
  const { orderState } = useOrdering();

  return (
    <header className={styles.header}>
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
              <span>
                <p>Order by phone</p>
                <p>(206) 459-5365</p>
              </span>
              <button>
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button>
                <FontAwesomeIcon icon={faTwitter} />
              </button>
              <button>
                <FontAwesomeIcon icon={faInstagram} />
              </button>
            </div>
            <div className={styles.headerSm}>
              <button>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
          <div className={styles.headerRight}>
            {showCart && (
              <button
                className={styles.cartBtn}
                onClick={() => setCartVisible(true)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                {orderState &&
                orderState.lineItems &&
                orderState.lineItems.length ? (
                  <span className="whatthefuck">
                    {orderState.lineItems.length}
                  </span>
                ) : null}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
