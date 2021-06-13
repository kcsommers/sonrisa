import { Button } from '@components';
import { IOrderableItem } from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '@redux';
import { useState } from 'react';
import { IWithOrdering, withOrdering } from '../hoc/withOrdering';
import { ImageSlider } from './../ImageSlider/ImageSlider';
import styles from './OrderOverlay.module.scss';

export interface OrderOverlayProps extends IWithOrdering {
  item: IOrderableItem;
}

const OrderOverlayComponent = (props: OrderOverlayProps) => {
  const orderState = useAppSelector((state) => state.order);

  const [quantity, setQuantity] = useState(0);

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
          onClick={() =>
            props.updateOrder &&
            props.updateOrder(orderState, props.item, quantity)
          }
        />
      </div>
    </div>
  );
};

export const OrderOverlay = withOrdering(OrderOverlayComponent);
