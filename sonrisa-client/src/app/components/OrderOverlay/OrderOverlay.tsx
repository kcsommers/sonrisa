import { Button } from '@components';
import { IOrderableItem } from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addItem, removeItem, useAppDispatch } from '@redux';
import { useState } from 'react';
import { ImageSlider } from './../ImageSlider/ImageSlider';
import styles from './OrderOverlay.module.scss';

export interface OrderOverlayProps {
  item: IOrderableItem;
}

export const OrderOverlay = (props: OrderOverlayProps) => {
  const [quantity, setQuantity] = useState(0);

  const dispatch = useAppDispatch();

  const addToOrder = (): void => {
    dispatch(
      quantity === 0 ? removeItem(props.item) : addItem(props.item, quantity)
    );
  };

  return (
    <div className={`${styles.templateWrap}`}>
      <div className={styles.overlayBody}>
        <ImageSlider images={props.item.images.slice(1)} />

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
          onClick={addToOrder}
        />
      </div>
    </div>
  );
};
