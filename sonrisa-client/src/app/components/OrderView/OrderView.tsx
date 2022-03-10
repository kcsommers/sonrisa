import {
  getMoneyString,
  getOrderSubtotal,
  getOrderTax,
  getOrderTip,
  getOrderTotal,
  useCatalog,
  useOrdering,
} from '@core';
import { CartItem } from '../CartItem/CartItem';
import styles from './OrderView.module.scss';

interface IOrderViewProps {
  canRemoveItems: boolean;
}

export const OrderView = ({ canRemoveItems }: IOrderViewProps) => {
  const { currentOrder, tip } = useOrdering();

  const { catalogImageMap } = useCatalog();

  console.log(tip);

  return (
    <div>
      {!currentOrder?.lineItems?.length ? (
        <p className={styles.noItemsText}>*No items in cart</p>
      ) : (
        <>
          {currentOrder.lineItems?.map((item) => (
            <CartItem
              canRemove={canRemoveItems}
              orderItem={item}
              key={item.uid}
              imageUrl={catalogImageMap[item.catalogObjectId as string]?.[0]}
            />
          ))}
          <div className={styles.checkoutWrap}>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Subtotal</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderSubtotal(currentOrder))}
              </p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Tax</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderTax(currentOrder))}
              </p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Tip</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(tip || 0)}
              </p>
            </div>
            <div className={styles.checkoutItemWrap}>
              <p className={styles.checkoutItemLabel}>Total</p>
              <p className={styles.checkoutItemTotal}>
                {getMoneyString(getOrderTotal(currentOrder))}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
