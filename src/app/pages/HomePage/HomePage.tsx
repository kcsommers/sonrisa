import { RouteComponentProps } from 'react-router-dom';
import introBg from '@assets/images/sonrisa_1.png';
import logo from '@assets/images/sonrisa_logo.jpg';
import styles from './HomePage.module.scss';
import { donuts } from '../../core/ordering/donuts';

export const HomePage = (props: RouteComponentProps) => {
  return (
    <div className={styles.homePageWrap}>
      <section className={styles.landingWrap}>
        <div className={styles.landingInner}>
          <div className={styles.landingLogoWrap}>
            <img src={logo} alt="Sonrisa Logo" />
          </div>
          <div className={styles.landingBgWrap}>
            <img src={introBg} alt="Intro Doughnut" />
          </div>
        </div>
      </section>

      <section className={styles.orderingSection}>
        <div className={styles.orderingInner}>
          {donuts.map((d) => (
            <div className={styles.donutBoxWrap}>
              <div className={styles.donutBox}>
                <img src={d.image} alt={`Order ${d.name}`} />
              </div>
              <p>{d.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
