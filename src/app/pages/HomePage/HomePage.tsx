import { RouteComponentProps } from 'react-router-dom';
import introBg from '@assets/images/sonrisa_1.png';
import logo from '@assets/images/sonrisa_logo.jpg';
import doHand from '@assets/images/do-hand.jpg';
import styles from './HomePage.module.scss';
import { donuts } from '../../core/ordering/donuts';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';

export const HomePage = (props: RouteComponentProps) => {
  return (
    <div className={styles.homePageWrap}>
      <section className={styles.landingWrap}>
        <div className={styles.landingInner}>
          <h1 className={styles.landingTitle}>Sonrisa</h1>
          <h3 className={styles.landingTagline}>Seattle, WA</h3>
          <img className={styles.landingLogo} src={logo} alt="Sonrisa Logo" />
        </div>
        <div>
          <img src={doHand} alt="" />
        </div>
      </section>
    </div>
  );
};
