import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { OrderView } from '../OrderView/OrderView';
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
    boxShadow: '0px 0px 0px 0px #aaaaaa',
  },
  center: {
    x: '0%',
    boxShadow: '-5px 0px 50px 1px #aaaaaa',
  },
  exit: {
    x: '100%',
    boxShadow: '0px 0px 0px 0px #aaaaaa',
  },
};

export const Cart = ({ isVisible, setIsVisible }: ICartProps) => {
  const history = useHistory();

  const goToCheckout = (): void => {
    setIsVisible(false);
    history.push('/checkout');
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    body.style.overflow = isVisible ? 'hidden' : 'auto';
  }, [isVisible]);

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
            if ((e.target as Element).classList.contains(styles.cartWrap)) {
              setIsVisible(false);
            }
          }}
        >
          <motion.div
            className={styles.cartInner}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.3,
              type: 'tween',
              ease: 'circOut',
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
              <OrderView />
              <Button text="Checkout" onClick={goToCheckout} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
