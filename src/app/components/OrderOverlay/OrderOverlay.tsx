import { useState } from 'react';
import styles from './OrderOverlay.module.scss';
import { OrderableItem } from '@core';
import { Button } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

export interface OrderOverlayProps {
  item: OrderableItem;
}

export const OrderOverlay = (props: OrderOverlayProps) => {
  const [quantity, setQuantity] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className={`${styles.templateWrap}`}>
      <div className={styles.overlayBody}>
        <div className={styles.imagesWrap}>
          <img
            src={props.item.images[currentImageIndex]}
            alt={props.item.name}
          />

          <div className={styles.imgArrowsWrap}>
            <button
              onClick={() => {
                setCurrentImageIndex(
                  currentImageIndex === 0
                    ? props.item.images.length - 1
                    : currentImageIndex - 1
                );
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              onClick={() => {
                setCurrentImageIndex(
                  currentImageIndex === props.item.images.length - 1
                    ? 0
                    : currentImageIndex + 1
                );
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
        <div className={styles.descriptionWrap}>
          <h3>{props.item.name}</h3>
          <p>{props.item.description}</p>
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
          text={`Add to Order $${((quantity * props.item.price) / 100).toFixed(
            2
          )}`}
          size="md"
          isFullWidth={true}
        />
      </div>
    </div>
  );
};
