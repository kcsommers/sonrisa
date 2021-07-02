import { getMoneyString } from '@core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderLineItem } from 'square';
import styles from './CartItem.module.scss';

type CartItemProps = {
  orderItem: OrderLineItem;

  imageUrl: string;
};

export const CartItem = ({ orderItem, imageUrl }: CartItemProps) => {
  const removeFromCart = (item: OrderLineItem): void => {
    // dispatch(removeItem(item));
  };

  return (
    <div className={styles.cartItemWrap}>
      <button onClick={() => removeFromCart(orderItem)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className={styles.cartItemImgWrap}>
        <img src={imageUrl} alt={orderItem.name} />
      </div>

      <div className={styles.itemDetailsWrap}>
        <p className={styles.itemName}>{orderItem.name}</p>
        <div className={styles.itemDetailWrap}>
          <p className={styles.itemLabel}>Quantity</p>
          <p className={styles.itemData}>{orderItem.quantity}</p>
        </div>
        <div className={styles.itemDetailWrap}>
          <p className={styles.itemLabel}>Total</p>
          <p className={styles.itemData}>
            {getMoneyString(+(orderItem.totalMoney?.amount as string))}
          </p>
        </div>
      </div>
    </div>
  );
};
