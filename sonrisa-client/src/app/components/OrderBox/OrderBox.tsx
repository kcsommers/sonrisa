import {
  getItemName,
  getItemPrice,
  getItemVariationId,
  logger,
  useOrdering,
} from '@core';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CatalogObject } from 'square';
import { OrderOverlay } from '../OrderOverlay/OrderOverlay';
import { Overlay } from '../Overlay/Overlay';
import styles from './OrderBox.module.scss';

interface OrderBoxProps {
  item: CatalogObject;

  imageUrl: string;

  onOrderUpdate: (success: boolean) => void;
}

export const OrderBox = ({ item, imageUrl, onOrderUpdate }: OrderBoxProps) => {
  const { getItemQuantity, setItemQuantity, currentOrder } = useOrdering();

  const [quantity, setQuantity] = useState(0);

  const [overlayOpen, setOverlayOpen] = useState(false);

  const prevQuantityRef = useRef(quantity);

  const updateCart = () => {
    if (quantity === prevQuantityRef.current) {
      return;
    }

    setOverlayOpen(false);

    setItemQuantity(item, quantity)
      .then((res) => {
        prevQuantityRef.current = quantity;
        onOrderUpdate(true);
        logger.log('[setItemQuantity response]:::: ', res);
      })
      .catch((err) => {
        onOrderUpdate(false);
        logger.error(err);
      });
  };

  // on init effect
  // updates local quantity and price if order id changes
  const orderIdRef = useRef('');
  useEffect(() => {
    if (!item || currentOrder?.id === orderIdRef.current) {
      return;
    }

    const _quantity = getItemQuantity(getItemVariationId(item) || '');

    prevQuantityRef.current = _quantity;
    orderIdRef.current = currentOrder?.id as string;
    setQuantity(_quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder?.id]);

  return (
    <div className={styles.orderBox}>
      <AnimatePresence>
        {prevQuantityRef.current && (
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
            <span>{prevQuantityRef.current}</span>
          </motion.span>
        )}
      </AnimatePresence>
      <div className={styles.imgWrap} onClick={() => setOverlayOpen(true)}>
        <div className={styles.imgHoverBg}></div>
        <img src={imageUrl} alt={getItemName(item)} />
      </div>
      <div className={styles.nameWrap}>
        <span>{getItemName(item)}</span>
      </div>
      <Overlay isOpen={overlayOpen} setIsOpen={setOverlayOpen}>
        <OrderOverlay
          item={item}
          quantity={quantity}
          setQuantity={setQuantity}
          updateCart={updateCart}
        />
      </Overlay>
    </div>
  );
};
