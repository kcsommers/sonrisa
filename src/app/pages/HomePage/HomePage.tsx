import { RouteComponentProps } from 'react-router-dom';
import introBg from '@assets/images/sonrisa_1.png';
import logo from '@assets/images/sonrisa_logo_transparent.png';
import doughnutBasket from '@assets/images/doughnut-basket.jpg';
import styles from './HomePage.module.scss';
import { doughnuts } from '../../core/ordering/doughnuts';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { OrderBox } from '../../components/OrderBox/OrderBox';

export const HomePage = (props: RouteComponentProps) => {
  return (
    <div className={styles.homePageWrap}>
      <section className={styles.landingWrap}>
        <div className={styles.landingInner}>
          <img className={styles.landingLogo} src={logo} alt="Sonrisa Logo" />
          <div className={styles.landingBtnWrap}>
            {/* <Button text="Order Online" /> */}
          </div>
        </div>
      </section>

      <section className={styles.orderNowWrap}>
        <div className={styles.orderBoxesWrap}>
          {doughnuts.map((d) => (
            <div className={styles.orderBoxWrap}>
              <OrderBox item={d} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
