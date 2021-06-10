import { OverlayTemplates, IOrderableItem } from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addItem, removeItem, toggleOverlay, useAppDispatch } from '@redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './OrderBox.module.scss';

export interface OrderBoxProps {
  item: IOrderableItem;
}

export const OrderBox = (props: OrderBoxProps) => {
  const [quantity, setQuantity] = useState(0);

  const dispatch = useAppDispatch();

  const openOverlay = () => {
    dispatch(
      toggleOverlay({
        isOpen: true,
        template: OverlayTemplates.ORDER,
        context: props.item,
      })
    );
  };

  const addToOrder = (): void => {
    dispatch(
      quantity === 0 ? removeItem(props.item) : addItem(props.item, quantity)
    );
  };

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
      <div
        className={styles.imgWrap}
        onClick={() => {
          openOverlay();
        }}
      >
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
        <Button
          text={`Update Cart $${((quantity * props.item.price) / 100).toFixed(
            2
          )}`}
          size="sm"
          onClick={addToOrder}
        />
      </div>
    </div>
  );
};
