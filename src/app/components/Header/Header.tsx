import logo from '@assets/images/sonrisa_logo.jpg';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
      <div className={styles.headerInner}>
        <div className={styles.headerInnerLeft}>
          <p>Order by phone</p>
          <p>(206) 459-5365</p>
        </div>
        <div className={styles.headerInnerRight}>
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
    </header>
  );
};
