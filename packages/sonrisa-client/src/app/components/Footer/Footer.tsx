import logo from '../../../assets/images/sonrisa_logo_transparent.png';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner}`}>
        <div className={styles.footerLogoWrap}>
          <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
        </div>
      </div>
    </footer>
  );
};
