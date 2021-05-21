import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} max-width-container`}></div>
    </footer>
  );
};
