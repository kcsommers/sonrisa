import {
  getItemName,
  getItemPrice,
  getItemVariationId,
  getMoneyString,
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

  isSpecialsItem?: boolean;

  imageUrl: string;

  onOrderUpdate: (success: boolean) => void;
}

export const OrderBox = ({
  item,
  imageUrl,
  onOrderUpdate,
  isSpecialsItem = false,
}: OrderBoxProps) => {
  const { getItemQuantity, currentOrder } = useOrdering();

  const [quantity, setQuantity] = useState(0);

  const [overlayOpen, setOverlayOpen] = useState(false);

  const prevQuantityRef = useRef(quantity);

  const orderUpdated = (success: boolean): void => {
    setOverlayOpen(false);
    onOrderUpdate(success);
  };

  // on init effect
  // updates local quantity and price if order id changes
  const orderIdRef = useRef('');
  useEffect(() => {
    if (!item) {
      return;
    }

    const _quantity = getItemQuantity(getItemVariationId(item) || '');

    prevQuantityRef.current = _quantity;
    orderIdRef.current = currentOrder?.id as string;
    setQuantity(_quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder]);

  return (
    <div className={styles.orderBox}>
      <div
        className={styles.orderBoxInner}
        onClick={() => setOverlayOpen(true)}
      >
        <div className={styles.imgHoverBg}></div>
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
        {imageUrl && (
          <div
            className={`${styles.imgWrap} ${
              isSpecialsItem ? styles.specialImgWrap : ''
            }`}
          >
            <img src={imageUrl} alt={getItemName(item)} />
          </div>
        )}
        <div className={styles.nameWrap}>
          <span>{isSpecialsItem ? 'Rotating Special' : getItemName(item)}</span>
          <span>{getMoneyString(+getItemPrice(item))}</span>
        </div>
      </div>
      <Overlay isOpen={overlayOpen} setIsOpen={setOverlayOpen}>
        <OrderOverlay
          item={item}
          quantity={quantity}
          setQuantity={setQuantity}
          orderUpdated={orderUpdated}
          prevQuantityRef={prevQuantityRef}
        />
      </Overlay>
    </div>
  );
};
