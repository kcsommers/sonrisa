import { ICatalogCategoryMap } from 'packages/core/dist/bundles';
import { useEffect, useMemo } from 'react';
import { useCatalog, useOrdering } from '../../context';
import { logger, toTitleCase } from '../../utils';
import { Alert } from '../Alert/Alert';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { CatalogItemBox } from '../CatalogItemBox/CatalogItemBox';
import styles from './Menu.module.scss';
import { Api } from '../../api';

interface IMenuProps {
  onOrderUpdate: (success: boolean) => void;
}

const CATEGORIES = ['donut boxes', 'specials', 'drinks'];

export const Menu = ({ onOrderUpdate }: IMenuProps) => {
  const { categoryMapByName } = useCatalog();
  const { orderingStatus, setOrderingStatus } = useOrdering();

  useEffect(() => {
    const checkAcceptingOrders = async () => {
      try {
        const _response = await Api.acceptingOrders();
        logger.log('[acceptingOrders response]:::: ', _response);
        setOrderingStatus(_response.data);
      } catch (err: any) {
        logger.error(err);
        setOrderingStatus({
          acceptingOrders: false,
          message:
            'There was an unexpected error. Please refresh the page to try again.',
        });
      }
    };
    checkAcceptingOrders();
  }, []);

  return (
    <div className={`${styles.menuWrap}`}>
      {!orderingStatus.acceptingOrders && (
        <div className={styles.alertWrap}>
          <Alert type='danger' message={orderingStatus.message!} />
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
            <div
              className={`${styles.categoryWrapInner}${
                categoryName === 'donut boxes' ? ` ${styles.wrapSmall}` : ''
              }`}
            >
              {categoryMapByName[categoryName].catalogObjects.map(
                (objects, i) => (
                  <CatalogItemBox
                    key={categoryName + i}
                    catalogObjects={objects}
                    onOrderUpdate={onOrderUpdate}
                    categoryName={categoryName}
                  />
                )
              )}
              {categoryName === 'donut boxes' && (
                <div className={styles.flavorsWrap}>
                  <h6>Flavors</h6>
                  <div className={styles.flavorsWrapInner}>
                    {categoryMapByName.flavors.catalogObjects.map(
                      (flavorObj) => (
                        <div
                          key={flavorObj.item.itemData.name}
                          className={styles.flavorWrap}
                        >
                          <div className={styles.flavorImgWrap}>
                            <img
                              src={flavorObj.image.url}
                              alt={flavorObj.item.itemData.name}
                            />
                          </div>
                          <p>{flavorObj.item.itemData.name}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
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
