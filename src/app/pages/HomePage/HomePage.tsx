import { RouteComponentProps } from 'react-router-dom';
import introBg from '@assets/images/sonrisa_1.png';
import styles from './HomePage.module.scss';

export const HomePage = (props: RouteComponentProps) => {
  return (
    <div className={styles.landingWrap}>
      <img
        src={introBg}
        alt="Intro Doughnut"
        style={{
          width: '100%',
        }}
      />
    </div>
  );
};
