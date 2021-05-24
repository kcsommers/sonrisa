import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Cart.module.scss';
import { useAppSelector, useAppDispatch, toggleCart } from '@redux';

export const Cart = () => {
  const cartState = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const close = (): void => {
    dispatch(toggleCart(false));
  };

  return (
    <div
      className={`${styles.cartWrap} ${
        cartState?.isOpen ? styles.cartOpen : ''
      }`}
    >
      <button className={styles.closeBtn} onClick={close}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};
