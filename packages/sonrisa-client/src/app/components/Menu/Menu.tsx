import { ICatalogCategoryMap } from 'packages/core/dist/bundles';
import { useMemo } from 'react';
import { useCatalog, useOrdering } from '../../context';
import { getItemVariationId, toTitleCase } from '../../utils';
import { Alert } from '../Alert/Alert';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { OrderBox } from '../OrderBox/OrderBox';
import styles from './Menu.module.scss';

interface IMenuProps {
  onOrderUpdate: (success: boolean) => void;
}

const CATEGORIES = ['flavors', 'main menu', 'specials', 'drinks'];

export const Menu = ({ onOrderUpdate }: IMenuProps) => {
  const { catalog } = useCatalog();
  const { orderingStatus } = useOrdering();

  const categoryMapByName = useMemo<ICatalogCategoryMap>(() => {
    console.log('filtering:::::::: ');
    if (!catalog) {
      return catalog;
    }
    const categoryMap: ICatalogCategoryMap = catalog.catalogCategoryMap;
    const filteredMap = Object.keys(categoryMap).reduce((map, categoryId) => {
      const categoryObjects = categoryMap[categoryId].catalogObjects;
      if (!categoryObjects || !categoryObjects.length) {
        return map;
      }
      const categoryName = categoryMap[categoryId].category.name;
      map[categoryName] = categoryMap[categoryId];
      return map;
    }, {});
    return filteredMap;
  }, [catalog]);

  return (
    <div className={`${styles.menuWrap}`}>
      {!orderingStatus.acceptingOrders && (
        <div className={styles.alertWrap}>
          <Alert type="danger" message={orderingStatus.message!} />
        </div>
      )}
      {categoryMapByName ? (
        CATEGORIES.filter(
          (categoryName) => !!categoryMapByName[categoryName]
        ).map((categoryName) => (
          <div key={categoryName} className={styles.categoryWrap}>
            <h5>
              {toTitleCase(categoryMapByName[categoryName].category.name)}
            </h5>
            <div className={styles.categoryWrapInner}>
              {categoryMapByName[categoryName].catalogObjects.map(
                (objects, i) => (
                  <OrderBox
                    key={categoryName + i}
                    catalogObjects={objects}
                    onOrderUpdate={onOrderUpdate}
                    categoryName={categoryName}
                  />
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.loadingWrap}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
