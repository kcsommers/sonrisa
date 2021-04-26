import logo from '@assets/images/sonrisa_logo.jpg';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt="Sonrisa Logo" />
    </header>
  );
};
