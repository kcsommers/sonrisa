import { RouteComponentProps } from 'react-router';
import styles from './OrderSuccessPage.module.scss';

export const OrderSuccessPage = (props: RouteComponentProps) => {
  return (
    <div>
      <div className={styles.pageInner}>
        <div className={`${styles.messageWrap} responsive-container`}>
          <h4>Thank you!</h4>
          <h3>Your order has been placed</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            ratione repellat dolore soluta facilis nam molestiae? Minus eius
            voluptatum voluptate, ipsa reprehenderit inventore laudantium quod
            nulla aspernatur earum quae eos!
          </p>
        </div>
      </div>
    </div>
  );
};
