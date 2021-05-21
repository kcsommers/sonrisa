import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { OrderBox } from '../../components/OrderBox/OrderBox';
import { doughnuts } from '../../core/ordering/doughnuts';
import doughnutHalves from '@images/doughnut-halves.png';
import styles from './HomePage.module.scss';
import { Button } from '@components';

export const HomePage = (props: RouteComponentProps) => {
  return (
    <div className={styles.homePageWrap}>
      <Header />
      <section className={`${styles.landingSection}`}>
        <div className="max-width-container">
          <div className={`${styles.landingInner} section-container`}>
            <span className={styles.orderBtnWrap}>
              <Button text="Place an Order Online" size="md" />
            </span>
            <img src={doughnutHalves} alt="Doughnut Half" />
          </div>
        </div>
      </section>

      <section className={styles.orderSection}>
        <p className={`${styles.orderSectionText} max-width-container`}>
          <span className="section-container">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            architecto ipsam placeat fuga animi aperiam.
          </span>
        </p>
        <div className={`${styles.orderBoxesWrap} section-container`}>
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
