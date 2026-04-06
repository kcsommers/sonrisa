// @ts-nocheck framer-motion v4 types
import { FontAwesomeIcon, IconProp } from '../FontAwesomeIcon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrdering } from '../../context';
import { useShell } from '../../context/shell/shell-context';
import { Button } from '../Button/Button';
import { OrderView } from '../OrderView/OrderView';
import styles from './Cart.module.scss';

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

export const Cart = () => {
  const { currentOrder } = useOrdering();
  const router = useRouter();
  const { cartVisible: isVisible, setCartVisible: setIsVisible } = useShell();

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

  const AP = AnimatePresence as React.ComponentType<{
    children?: React.ReactNode;
    mode?: string;
  }>;
  return (
    <AP mode="sync">
      {isVisible && (
        // @ts-expect-error framer-motion v4 types omit children for motion components
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
    </AP>
  );
};
