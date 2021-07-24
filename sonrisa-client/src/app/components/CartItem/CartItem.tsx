import { getMoneyString, useOrdering } from '@core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderLineItem } from 'square';
import styles from './CartItem.module.scss';

type CartItemProps = {
  orderItem: OrderLineItem;

  imageUrl: string;

  canRemove: boolean;
};

export const CartItem = ({ orderItem, imageUrl, canRemove }: CartItemProps) => {
  const { setItemQuantity } = useOrdering();

  return (
    <div className={styles.cartItemWrap}>
      {canRemove && (
        <button
          onClick={() =>
            setItemQuantity(orderItem.catalogObjectId as string, 0)
          }
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <div className={styles.cartItemImgWrap}>
        <div className={styles.cartItemImgInner}>
          <img src={imageUrl} alt={orderItem.name} />
        </div>
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
            {/** @ts-ignore */}
            {getMoneyString(+(orderItem.totalMoney?.amount as string))}
          </p>
        </div>
      </div>
    </div>
  );
};
