import { IOrderableItem } from '@core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '@redux';
import styles from './CartItem.module.scss';

type CartItemProps = {
  item: IOrderableItem;
};

export const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const removeFromCart = (item: IOrderableItem): void => {
    // dispatch(removeItem(item));
  };

  return (
    <div key={item.name} className={styles.cartItemWrap}>
      <button onClick={() => removeFromCart(item)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className={styles.cartItemImgWrap}>
        <img src={item.images[0]} alt={item.name} />
      </div>

      <div className={styles.itemDetailsWrap}>
        <p className={styles.itemName}>{item.name}</p>
        <div className={styles.itemDetailWrap}>
          <p className={styles.itemLabel}>Quantity</p>
          <p className={styles.itemData}>{item.quantity}</p>
        </div>
        <div className={styles.itemDetailWrap}>
          <p className={styles.itemLabel}>Total</p>
          <p className={styles.itemData}>
            ${((item.quantity * item.price) / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
