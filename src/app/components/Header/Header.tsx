import logo from '@assets/images/sonrisa_logo.jpg';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerInner} max-width-container`}>
        <div className={styles.headerLogoWrap}>
          <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
        </div>
        <div className={styles.headerSidesWrap}>
          <div className={styles.headerLeft}>
            <span>
              <p>Order by phone</p>
              <p>(206) 459-5365</p>
            </span>
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className={styles.headerRight}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
        </div>
      </div>
    </header>
  );
};
