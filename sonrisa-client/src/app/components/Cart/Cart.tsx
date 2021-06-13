import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleCart, useAppDispatch, useAppSelector } from '@redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Order } from '../Order/Order';
import styles from './Cart.module.scss';

export const Cart = () => {
  const cartState = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const close = (): void => {
    dispatch(toggleCart(false));
  };

  const goToCheckout = (): void => {
    close();
    history.push('/checkout');
  };

  return (
    <div
      className={`${styles.cartWrap} cart-wrap ${
        cartState?.isOpen ? styles.cartOpen : ''
      }`}
      onClick={(e) => {
        if ((e.target as Element).classList.contains('cart-wrap')) {
          close();
        }
      }}
    >
      <div className={`${styles.cartInner}`}>
        <div className={styles.cartHeader}>
          <h4>Cart</h4>
          <button onClick={close}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className={styles.cartBody}>
          <Order />
          <Button text="Checkout" onClick={goToCheckout} />
        </div>
      </div>
    </div>
  );
};
