import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICatalogObjects } from '@sonrisa/core';
import { useState } from 'react';
import { useOrdering } from '../../context';
import {
  calculateCost,
  getItemDescription,
  getItemName,
  getItemPrice,
  getItemVariationId,
  getMoneyString,
  logger,
} from '../../utils';
import { Button } from '../Button/Button';
import { ImageSlider } from './../ImageSlider/ImageSlider';
import styles from './OrderOverlay.module.scss';

interface OrderOverlayProps {
  catalogObjects: ICatalogObjects;
  quantity: number;
  prevQuantityRef: React.MutableRefObject<number>;
  setQuantity: (quantity: number) => void;
  orderUpdated: (success: boolean) => void;
  closeOverlay?: (event: React.MouseEvent) => void;
}

export const OrderOverlay = ({
  catalogObjects,
  quantity,
  setQuantity,
  orderUpdated,
  prevQuantityRef,
  closeOverlay,
}: OrderOverlayProps) => {
  const { setItemQuantity, orderingStatus } = useOrdering();
  const [updatingOrder, setUpdatingOrder] = useState(false);

  const updateOrder = () => {
    if (quantity === prevQuantityRef.current) {
      return;
    }

    setUpdatingOrder(true);

    setItemQuantity(getItemVariationId(catalogObjects.item), quantity)
      .then((res) => {
        prevQuantityRef.current = quantity;
        orderUpdated(true);
        logger.log('[setItemQuantity response]:::: ', res);
      })
      .catch((err) => {
        orderUpdated(false);
        logger.error(err);
      });
  };

  return (
    <div className={`${styles.templateWrap}`}>
      <button
        className={`${styles.closeOverlayBtn} close-overlay`}
        onClick={(e) => {
          closeOverlay && closeOverlay(e);
        }}
      >
        <FontAwesomeIcon icon={faTimes as IconProp} />
      </button>
      <div className={styles.overlayBody}>
        {catalogObjects.image?.url && (
          <ImageSlider images={[catalogObjects.image?.url!]} autoSlide={true} />
        )}
        <div className={styles.descriptionWrap}>
          <h3>{getItemName(catalogObjects.item)}</h3>
          <p>{getItemDescription(catalogObjects.item)}</p>
        </div>
        <div className={styles.quantityWrap}>
          <button
            className={`${styles.quantityBtn}${
              !orderingStatus?.acceptingOrders ? ' btn-disabled' : ''
            }`}
            onClick={() => setQuantity(Math.max(quantity - 1, 0))}
          >
            <FontAwesomeIcon icon={faMinus as IconProp} />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={`${styles.quantityBtn}${
              !orderingStatus?.acceptingOrders ? ' btn-disabled' : ''
            }`}
            onClick={() => setQuantity(quantity + 1)}
          >
            <FontAwesomeIcon icon={faPlus as IconProp} />
          </button>
        </div>
      </div>
      <div className={styles.overlayFooter}>
        <Button
          text={`Update Cart ${getMoneyString(
            calculateCost(getItemPrice(catalogObjects.item), quantity)
          )}`}
          size='md'
          isFullWidth={true}
          onClick={updateOrder}
          showSpinner={updatingOrder}
          isDisabled={
            !orderingStatus?.acceptingOrders ||
            prevQuantityRef.current === quantity
          }
        />
      </div>
    </div>
  );
};
