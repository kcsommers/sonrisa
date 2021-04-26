import { RouteComponentProps } from 'react-router-dom';
import introBg from '@assets/images/sonrisa_1.png';
import logo from '@assets/images/sonrisa_logo.jpg';
import styles from './HomePage.module.scss';
import { donuts } from '../../core/ordering/donuts';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';

export const HomePage = (props: RouteComponentProps) => {
  return (
    <div className={styles.homePageWrap}>
      <Header />
      <section className={styles.landingWrap}>
        <div className={styles.landingInner}>
          <div className={styles.orderNowBtnWrap}>
            <Button text="Order Online" />
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
