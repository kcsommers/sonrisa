import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner}`}>
        <div className={`${styles.footerInfoWrap}`}>
          {/* <h4>Sonrisa</h4>
          <p>(206) 459-5365</p> */}
        </div>
      </div>
    </footer>
  );
};
