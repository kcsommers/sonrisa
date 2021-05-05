import { OrderableItem } from 'app/core/ordering/OrderableItem';
import styles from './OrderBox.module.scss';

export interface OrderBoxProps {
  item: OrderableItem;
}

export const OrderBox = (props: OrderBoxProps) => {
  return (
    <div className={styles.orderBox}>
      <img src={props.item.images[0]} alt={props.item.name} />
      <p>{props.item.name}</p>
    </div>
  );
};
