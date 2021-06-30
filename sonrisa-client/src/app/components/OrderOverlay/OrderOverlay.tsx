import { Button } from '@components';
import { useOrdering } from '@core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { OrderLineItem } from '@square';
import { ImageSlider } from './../ImageSlider/ImageSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './OrderOverlay.module.scss';

interface OrderOverlayProps {
  item: OrderLineItem;
}

export const OrderOverlay = (props: OrderOverlayProps) => {
  // const { orderState, updateOrder } = useOrdering();

  const [quantity, setQuantity] = useState(0);

  const initializedRef = useRef(false);
  // useEffect(() => {
  //   if (initializedRef.current) {
  //     return;
  //   }

  //   initializedRef.current = true;
  //   // const _orderItem = orderState?.items.find(
  //   //   (i) => i.item.id === props.item.id
  //   // );

  //   // if (!_orderItem) {
  //   //   return;
  //   // }

  //   // setQuantity(_orderItem.quantity);
  // }, [orderState?.items, props.item.id]);

  return (
    <div className={`${styles.templateWrap}`}>
      <div className={styles.overlayBody}>
        <ImageSlider images={[]} />

        <div className={styles.descriptionWrap}>
          <h3>{props.item.name}</h3>
          {/* <p>{props.item.description}</p> */}
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
        {/* <Button
          text={`Update Cart $${((quantity * props.item.price) / 100).toFixed(
            2
          )}`}
          size="md"
          isFullWidth={true}
          onClick={() => updateOrder(props.item, quantity)}
        /> */}
      </div>
    </div>
  );
};
