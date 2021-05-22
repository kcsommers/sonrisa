import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderableItem } from 'app/core/ordering/OrderableItem';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './OrderBox.module.scss';

export interface OrderBoxProps {
  item: OrderableItem;
}

export const OrderBox = (props: OrderBoxProps) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className={styles.orderBox}>
      <AnimatePresence>
        {quantity && (
          <motion.span
            className={`${styles.quantityWrap}`}
            initial={{
              transform: 'translate(-100%, -100%)',
              opacity: 0,
            }}
            animate={{
              transform: 'translate(0%, 0%)',
              opacity: 1,
            }}
            exit={{
              transform: 'translate(-100%, -100%)',
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              bounce: 0.25,
            }}
          >
            <span>{quantity}</span>
          </motion.span>
        )}
      </AnimatePresence>
      <div className={styles.imgWrap}>
        <div className={styles.imgHoverBg}></div>
        <img src={props.item.images[0]} alt={props.item.name} />
      </div>
      <div className={styles.orderBoxBottom}>
        <div className={styles.nameWrap}>
          <button onClick={() => setQuantity(Math.max(quantity - 1, 0))}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{props.item.name}</span>
          <button onClick={() => setQuantity(quantity + 1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <Button text={`Add to Order ${'$0.00'}`} size="sm" isFullWidth={true} />
      </div>
    </div>
  );
};
