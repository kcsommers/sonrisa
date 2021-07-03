import { RouteComponentProps, useLocation } from 'react-router';
import { Payment } from 'square';
import styles from './OrderSuccessPage.module.scss';

interface ISuccessPageLocationState {
  payment: Payment;
}

export const OrderSuccessPage = () => {
  const { state } = useLocation<ISuccessPageLocationState>();

  return (
    <div>
      <div className={styles.pageInner}>
        <div className={`${styles.messageWrap} responsive-container`}>
          <h4>Thank you!</h4>
          <h3>Your order has been placed</h3>
          <a href={state.payment.receiptUrl}>
            Click here to view your receipt.
          </a>
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
