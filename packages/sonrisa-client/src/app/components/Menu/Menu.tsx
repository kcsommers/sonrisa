import { useCatalog, useOrdering } from '../../context';
import { getItemVariationId } from '../../utils';
import { Alert } from '../Alert/Alert';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { OrderBox } from '../OrderBox/OrderBox';
import styles from './Menu.module.scss';

interface IMenuProps {
  onOrderUpdate: (success: boolean) => void;
}

export const Menu = ({ onOrderUpdate }: IMenuProps) => {
  const { catalogItems, catalogImageMap } = useCatalog();

  const { orderingStatus } = useOrdering();

  console.log('imagemap:::: ', catalogImageMap, catalogItems);

  return (
    <div className={`${styles.orderBoxesWrap}`}>
      {!orderingStatus.acceptingOrders && (
        <div className={styles.alertWrap}>
          <Alert type="danger" message={orderingStatus.message!} />
        </div>
      )}
      {catalogItems.length ? (
        <div className={styles.orderBoxesInner}>
          {catalogItems.map((item) => (
            <div key={item.id} className={styles.orderBoxWrap}>
              <OrderBox
                item={item}
                onOrderUpdate={onOrderUpdate}
                catalogImage={catalogImageMap[getItemVariationId(item)]}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.loadingWrap}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
