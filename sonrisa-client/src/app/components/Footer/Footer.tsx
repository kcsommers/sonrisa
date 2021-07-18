import logo from '@assets/images/sonrisa_logo_transparent.png';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner}`}>
        <div className={styles.copyrightWrap}>
          <span>&copy; Copyright 2021</span>
          <span>
            Developed by{' '}
            <a href="https://www.linkedin.com/in/kacy-sommers/">
              M Kacy Sommers
            </a>
          </span>
        </div>
        <div className={styles.followTextWrap}>
          <a
            className={styles.followText}
            href="https://www.instagram.com/sonrisa.donuts/"
          >
            Follow us!
            <span className={styles.instagramIconWrap}>
              <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
            </span>
          </a>
        </div>
        <div className={styles.footerLogoWrap}>
          <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
        </div>
      </div>
    </footer>
  );
};
