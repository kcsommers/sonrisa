import {
  calculateCost,
  getItemName,
  getItemPrice,
  getItemVariationId,
  getMoneyString,
  logger,
  useOrdering,
} from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CatalogObject } from 'square';
import { Button } from '../Button/Button';
import styles from './OrderBox.module.scss';

interface OrderBoxProps {
  item: CatalogObject;

  imageUrl: string;
}

export const OrderBox = ({ item, imageUrl }: OrderBoxProps) => {
  const { getItemQuantity, setItemQuantity, orderState } = useOrdering();

  const [quantity, setQuantity] = useState(0);

  const [price, setPrice] = useState(BigInt(0));

  const openOverlay = () => {};

  const updateCart = () => {
    setItemQuantity(item, quantity)
      .then((res) => {
        logger.log('[setItemQuantity response]:::: ', res);
      })
      .catch((err) => logger.error(err));
  };

  useEffect(() => {
    setPrice(getItemPrice(item) ?? BigInt(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on init effect
  // updates local quantity ans price if order id changes
  const orderIdRef = useRef('');
  useEffect(() => {
    if (!item || orderState?.id === orderIdRef.current) {
      return;
    }

    orderIdRef.current = orderState?.id as string;
    setQuantity(getItemQuantity(getItemVariationId(item) || ''));
    setPrice(getItemPrice(item) ?? BigInt(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderState?.id]);

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
        <img src={imageUrl} alt={getItemName(item)} />
      </div>
      <div className={styles.orderBoxBottom}>
        <div className={styles.nameWrap}>
          <button onClick={() => setQuantity(Math.max(quantity - 1, 0))}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{getItemName(item)}</span>
          <button onClick={() => setQuantity(quantity + 1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <Button
          text={`Update Cart ${getMoneyString(calculateCost(price, quantity))}`}
          size="sm"
          onClick={updateCart}
        />
      </div>
    </div>
  );
};
