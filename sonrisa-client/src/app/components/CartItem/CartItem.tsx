import { IOrderableItem, IOrderItem } from '@core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CartItem.module.scss';

type CartItemProps = {
  orderItem: IOrderItem;
};

export const CartItem = ({ orderItem }: CartItemProps) => {
  const removeFromCart = (item: IOrderableItem): void => {
    // dispatch(removeItem(item));
  };

  return (
    <div key={orderItem.item.name} className={styles.cartItemWrap}>
      <button onClick={() => removeFromCart(orderItem.item)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className={styles.cartItemImgWrap}>
        <img src={orderItem.item.images[0]} alt={orderItem.item.name} />
      </div>

      <div className={styles.itemDetailsWrap}>
        <p className={styles.itemName}>{orderItem.item.name}</p>
        <div className={styles.itemDetailWrap}>
          <p className={styles.itemLabel}>Quantity</p>
          <p className={styles.itemData}>{orderItem.quantity}</p>
        </div>
        <div className={styles.itemDetailWrap}>
          <p className={styles.itemLabel}>Total</p>
          <p className={styles.itemData}>
            ${((orderItem.quantity * orderItem.item.price) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
