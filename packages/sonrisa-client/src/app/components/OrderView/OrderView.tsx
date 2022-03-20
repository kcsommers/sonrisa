import { OrderLineItem } from 'square';
import { useCatalog, useOrdering } from '../../context';
import {
  getMoneyString,
  getOrderSubtotal,
  getOrderTax,
  getOrderTotal,
} from '../../utils';
import { CartItem } from '../CartItem/CartItem';
import styles from './OrderView.module.scss';

interface IOrderViewProps {
  canRemoveItems: boolean;
}

export const OrderView = ({ canRemoveItems }: IOrderViewProps) => {
  const { currentOrder } = useOrdering();
  const { tipMoney } = useOrdering();
  const { catalog } = useCatalog();

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
              imageUrl={catalog.catalogImageMap[item.catalogObjectId]?.url!}
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
                {
                  //@ts-ignore
                  getMoneyString(tipMoney.amount)
                }
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