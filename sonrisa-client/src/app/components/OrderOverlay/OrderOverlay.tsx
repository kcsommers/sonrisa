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
import { faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
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

  closeOverlay?: (event: React.MouseEvent) => void;
}

export const OrderOverlay = ({
  item,
  quantity,
  setQuantity,
  orderUpdated,
  prevQuantityRef,
  closeOverlay,
}: OrderOverlayProps) => {
  const { setItemQuantity, acceptingOrders } = useOrdering();

  const { catalogImageMap } = useCatalog();

  const [updatingOrder, setUpdatingOrder] = useState(false);

  const images = useMemo(() => {
    const imageMap = catalogImageMap[getItemVariationId(item)] || [];
    const hasBuiltInImages = imageMap.length > 1;
    return hasBuiltInImages ? imageMap.slice(1) : imageMap;
  }, []);

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
      <button
        className={`${styles.closeOverlayBtn} close-overlay`}
        onClick={(e) => {
          closeOverlay && closeOverlay(e);
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className={styles.overlayBody}>
        {images.length ? (
          <div className={styles.imgSliderWrap}>
            <ImageSlider images={images} autoSlide={true} />
          </div>
        ) : null}
        <div className={styles.descriptionWrap}>
          <h3>{getItemName(item)}</h3>
          <p>{getItemDescription(item)}</p>
        </div>
        <div className={styles.quantityWrap}>
          <button
            className={`${styles.quantityBtn}${
              !acceptingOrders ? ' btn-disabled' : ''
            }`}
            onClick={() => setQuantity(Math.max(quantity - 1, 0))}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={`${styles.quantityBtn}${
              !acceptingOrders ? ' btn-disabled' : ''
            }`}
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
          isDisabled={!acceptingOrders || prevQuantityRef.current === quantity}
        />
      </div>
    </div>
  );
};
