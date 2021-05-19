import { RouteComponentProps } from 'react-router-dom';
import introBg from '@assets/images/sonrisa_1.png';
import logo from '@assets/images/sonrisa_logo_transparent.png';
import basket from '@assets/images/basket-transparent.png';
import styles from './HomePage.module.scss';
import { doughnuts } from '../../core/ordering/doughnuts';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { OrderBox } from '../../components/OrderBox/OrderBox';

export const HomePage = (props: RouteComponentProps) => {
  return (
    <div className={styles.homePageWrap}>
      <Header />
      <section className={styles.landingWrap}></section>

      <section className={styles.orderNowWrap}>
        <div className={styles.orderBoxesWrap}>
          {doughnuts.map((d) => (
            <div key={d.name} className={styles.orderBoxWrap}>
              <OrderBox item={d} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
