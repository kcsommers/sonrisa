import { ICatalogObjects } from '@sonrisa/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useOrdering } from '../../context';
import {
  getItemName,
  getItemPrice,
  getItemVariationId,
  getMoneyString,
} from '../../utils';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { OrderOverlay } from '../OrderOverlay/OrderOverlay';
import { Overlay } from '../Overlay/Overlay';
import styles from './CatalogItemBox.module.scss';

interface CatalogItemBoxProps {
  catalogObjects: ICatalogObjects;
  onOrderUpdate: (success: boolean) => void;
  categoryName: string;
}

export const CatalogItemBox = ({
  catalogObjects,
  onOrderUpdate,
  categoryName,
}: CatalogItemBoxProps) => {
  const { getItemQuantity, currentOrder } = useOrdering();
  const [quantity, setQuantity] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const prevQuantityRef = useRef(quantity);
  const [loadedSrc, setLoadedSrc] = useState<string>();
  const orderUpdated = (success: boolean): void => {
    setOverlayOpen(false);
    onOrderUpdate(success);
  };

  // on init effect
  // updates local quantity and price if order id changes
  const orderIdRef = useRef('');
  useEffect(() => {
    if (!catalogObjects || !catalogObjects.item) {
      return;
    }

    const quantity = getItemQuantity(
      getItemVariationId(catalogObjects.item) || ''
    );

    prevQuantityRef.current = quantity;
    orderIdRef.current = currentOrder?.id as string;
    setQuantity(quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOrder]);

  useEffect(() => {
    if (!catalogObjects.image || !catalogObjects.image.url) {
      return;
    }
    const img = new Image();
    img.onload = () => setLoadedSrc(catalogObjects.image.url);
    img.src = catalogObjects.image.url;
  }, [catalogObjects.image]);

  return (
    <div className={styles.catalogItemBox}>
      <div
        className={styles.catalogItemBoxInner}
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
        {catalogObjects.image?.url && (
          <div className={styles.imgWrap}>
            {loadedSrc ? (
              <img src={loadedSrc} alt={getItemName(catalogObjects.item)} />
            ) : (
              <LoadingSpinner size='sm' color='dark' />
            )}
          </div>
        )}
        <div className={styles.nameWrap}>
          <span>{getItemName(catalogObjects.item)}</span>
          <span>{getMoneyString(+getItemPrice(catalogObjects.item))}</span>
        </div>
      </div>
      <Overlay isOpen={overlayOpen} setIsOpen={setOverlayOpen}>
        <OrderOverlay
          catalogObjects={catalogObjects}
          quantity={quantity}
          setQuantity={setQuantity}
          orderUpdated={orderUpdated}
          prevQuantityRef={prevQuantityRef}
        />
      </Overlay>
    </div>
  );
};
