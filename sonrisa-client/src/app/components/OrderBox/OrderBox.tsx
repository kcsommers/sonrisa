import { OverlayTemplates, IOrderableItem, Api } from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  setOrderItems,
  toggleOverlay,
  useAppDispatch,
  useAppSelector,
} from '@redux';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './OrderBox.module.scss';

export interface OrderBoxProps {
  item: IOrderableItem;
}

export const OrderBox = (props: OrderBoxProps) => {
  const orderState = useAppSelector((state) => state.order);

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

  const updateCart = (): void => {
    if (!orderState) {
      return;
    }

    const clonedItems = cloneDeep(orderState.items);

    // look for item in cart
    const itemIndex = clonedItems.findIndex((i) => i.id === props.item.id);

    // if it exists, replace it
    if (itemIndex > -1) {
      clonedItems.splice(itemIndex, 1, props.item);
    } else {
      // otherwise add it
      clonedItems.push(props.item);
    }

    Api.updateOrder(orderState._id, clonedItems)
      .then((res) => {
        console.log('RESULT:::: ', res);
        // dispatch(setOrderItems(clonedItems));
      })
      .catch((err) => console.error(err));
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
          onClick={updateCart}
        />
      </div>
    </div>
  );
};
