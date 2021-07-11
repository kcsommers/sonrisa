import {
  calculateCost,
  getItemDescription,
  getItemName,
  getItemPrice,
  getItemVariationId,
  getMoneyString,
  logger,
  useCatalog,
  useOrdering,
} from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { CatalogObject } from 'square';
import { Button } from '../Button/Button';
import { ImageSlider } from './../ImageSlider/ImageSlider';
import styles from './OrderOverlay.module.scss';

interface OrderOverlayProps {
  item: CatalogObject;

  quantity: number;

  prevQuantityRef: React.MutableRefObject<number>;

  setQuantity: (quantity: number) => void;

  orderUpdated: (success: boolean) => void;
}

export const OrderOverlay = ({
  item,
  quantity,
  setQuantity,
  orderUpdated,
  prevQuantityRef,
}: OrderOverlayProps) => {
  const { setItemQuantity } = useOrdering();

  const { catalogImageMap } = useCatalog();

  const [updatingOrder, setUpdatingOrder] = useState(false);

  const updateOrder = () => {
    if (quantity === prevQuantityRef.current) {
      return;
    }

    setUpdatingOrder(true);

    setItemQuantity(getItemVariationId(item), quantity)
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
      <div className={styles.overlayBody}>
        <div className={styles.imgSliderWrap}>
          <ImageSlider
            images={(catalogImageMap[getItemVariationId(item)] || []).slice(1)}
            autoSlide={true}
          />
        </div>

        <div className={styles.descriptionWrap}>
          <h3>{getItemName(item)}</h3>
          <p>{getItemDescription(item)}</p>
        </div>

        <div className={styles.quantityWrap}>
          <button
            className={styles.quantityBtn}
            onClick={() => setQuantity(Math.max(quantity - 1, 0))}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={styles.quantityBtn}
            onClick={() => setQuantity(quantity + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>

      <div className={styles.overlayFooter}>
        <Button
          text={`Update Cart ${getMoneyString(
            calculateCost(getItemPrice(item), quantity)
          )}`}
          size="md"
          isFullWidth={true}
          onClick={updateOrder}
          showSpinner={updatingOrder}
        />
      </div>
    </div>
  );
};
