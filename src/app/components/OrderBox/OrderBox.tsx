import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderableItem } from 'app/core/ordering/OrderableItem';
import { Button } from '../Button/Button';
import styles from './OrderBox.module.scss';

export interface OrderBoxProps {
  item: OrderableItem;
}

export const OrderBox = (props: OrderBoxProps) => {
  return (
    <div className={styles.orderBox}>
      <img src={props.item.images[0]} alt={props.item.name} />
      <div className={styles.nameWrap}>
        <p>{props.item.name}</p>
      </div>
    </div>
  );
};
