import {
  calculateCost,
  getItemDescription,
  getItemName,
  getItemPrice,
  getItemVariationId,
  getMoneyString,
  useCatalog,
} from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CatalogObject } from 'square';
import { Button } from '../Button/Button';
import { ImageSlider } from './../ImageSlider/ImageSlider';
import styles from './OrderOverlay.module.scss';

interface OrderOverlayProps {
  item: CatalogObject;

  quantity: number;

  setQuantity: (quantity: number) => void;

  updateCart: () => void;
}

export const OrderOverlay = ({
  item,
  quantity,
  setQuantity,
  updateCart,
}: OrderOverlayProps) => {
  const { catalogImageMap } = useCatalog();

  return (
    <div className={`${styles.templateWrap}`}>
      <div className={styles.overlayBody}>
        <div className={styles.imgSliderWrap}>
          <ImageSlider
            images={catalogImageMap[getItemVariationId(item) || ''] || []}
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
          onClick={updateCart}
        />
      </div>
    </div>
  );
};
