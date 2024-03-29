import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useOrdering } from '../../context';
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
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.24)',
  },
  center: {
    x: '0%',
    boxShadow: '-5px 0px 50px 1px rgba(0, 0, 0, 0.24)',
  },
  exit: {
    x: '100%',
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.24)',
  },
};

export const Cart = ({ isVisible, setIsVisible }: ICartProps) => {
  const { currentOrder } = useOrdering();

  const router = useRouter();

  const goToCheckout = (): void => {
    setIsVisible(false);
    router.push('/checkout');
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
          initial='enter'
          animate='center'
          exit='exit'
          variants={containerVariants}
          onClick={(e) => {
            if ((e.target as Element).classList.contains(styles.cartWrap)) {
              setIsVisible(false);
            }
          }}
        >
          <motion.div
            className={styles.cartInner}
            initial='enter'
            animate='center'
            exit='exit'
            variants={innerVariants}
            transition={{
              duration: 0.3,
              type: 'tween',
              ease: 'circOut',
            }}
          >
            <div className={styles.cartHeader}>
              <h4>Cart</h4>
              <button onClick={() => setIsVisible(false)}>
                <FontAwesomeIcon icon={faTimes as IconProp} />
              </button>
            </div>
            <div className={styles.cartBody}>
              <OrderView canRemoveItems={true} />
              {currentOrder?.lineItems?.length ? (
                <Button text='Checkout' onClick={goToCheckout} />
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
