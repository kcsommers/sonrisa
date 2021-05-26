import { IOrderableItem } from '@core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeItem, toggleCart, useAppDispatch, useAppSelector } from '@redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './Cart.module.scss';
import { CartItem } from './../CartItem/CartItem';

export const Cart = () => {
  const cartState = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const close = (): void => {
    dispatch(toggleCart(false));
  };

  const removeFromCart = (item: IOrderableItem): void => {
    dispatch(removeItem(item));
  };

  const goToCheckout = (): void => {
    close();
    history.push('/checkout');
  };

  const getTotals = (): { tax: string; total: string; subtotal: string } => {
    if (!cartState || !cartState.items.length) {
      return {
        tax: '$0.00',
        total: '$0.00',
        subtotal: '$0.00',
      };
    }

    const subtotal = cartState.items.reduce((t, item) => {
      t += item.price * item.quantity;
      return t;
    }, 0);

    const tax = subtotal * 0.07;

    return {
      tax: `$${(tax / 100).toFixed(2)}`,
      total: `$${((subtotal + tax) / 100).toFixed(2)}`,
      subtotal: `$${(subtotal / 100).toFixed(2)}`,
    };
  };

  const { tax, total, subtotal } = getTotals();

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
          {!cartState?.items.length ? (
            <p className={styles.noItemsText}>*No items in cart</p>
          ) : (
            <>
              {cartState.items.map((item) => (
                <CartItem item={item} />
              ))}
              <div className={styles.checkoutWrap}>
                <div className={styles.checkoutItemWrap}>
                  <p className={styles.checkoutItemLabel}>Subtotal</p>
                  <p className={styles.checkoutItemTotal}>{subtotal}</p>
                </div>
                <div className={styles.checkoutItemWrap}>
                  <p className={styles.checkoutItemLabel}>Tax</p>
                  <p className={styles.checkoutItemTotal}>{tax}</p>
                </div>
                <div className={styles.checkoutItemWrap}>
                  <p className={styles.checkoutItemLabel}>Total</p>
                  <p className={styles.checkoutItemTotal}>{total}</p>
                </div>
                <Button text="Checkout" onClick={goToCheckout} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
