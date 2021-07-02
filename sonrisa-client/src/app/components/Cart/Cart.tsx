import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '@redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Order } from '../Order/Order';
import styles from './Cart.module.scss';

interface ICartProps {
  isVisible: boolean;

  setIsVisible: (isVisible: boolean) => void;
}

const containerVariants = {
  enter: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  center: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  exit: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
};

const innerVariants = {
  enter: {
    x: '100%',
  },
  center: {
    x: '0%',
  },
  exit: {
    x: '100%',
  },
};

export const Cart = ({ isVisible, setIsVisible }: ICartProps) => {
  const history = useHistory();

  const goToCheckout = (): void => {
    setIsVisible(false);
    history.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.cartWrap}
          initial="enter"
          animate="center"
          exit="exit"
          variants={containerVariants}
          onClick={(e) => {
            if ((e.target as Element).classList.contains('cart-wrap')) {
              setIsVisible(false);
            }
          }}
        >
          <motion.div
            className={`${styles.cartInner}`}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.2,
            }}
            variants={innerVariants}
          >
            <div className={styles.cartHeader}>
              <h4>Cart</h4>
              <button onClick={() => setIsVisible(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={styles.cartBody}>
              <Order />
              <Button text="Checkout" onClick={goToCheckout} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
