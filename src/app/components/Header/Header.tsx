import logo from '@assets/images/sonrisa_logo.jpg';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import { useAppSelector, useAppDispatch, toggleCart } from '@redux';

type HeaderProps = {
  logoSize?: 'sm' | 'lg';

  showCart?: boolean;
};

export const Header = ({ logoSize = 'lg', showCart = true }: HeaderProps) => {
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const openCart = () => {
    dispatch(toggleCart(true));
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.headerInner}`}>
        <div
          className={`${styles.headerLogoWrap} ${
            styles[`headerLogo-${logoSize}`]
          }`}
        >
          <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
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
              <button className={styles.cartBtn} onClick={openCart}>
                <FontAwesomeIcon icon={faShoppingCart} />
                {cart && cart.items.length > 0 && (
                  <span>{cart?.items.length}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
