import { useEffect } from 'react';
import { Api } from '../../api';
import { useCatalog, useOrdering } from '../../context';
import { logger, toTitleCase } from '../../utils';
import { CatalogItemBox } from '../CatalogItemBox/CatalogItemBox';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './Menu.module.scss';

interface IMenuProps {
  onOrderUpdate: (success: boolean) => void;
}

const CATEGORIES = ['donut boxes', 'specials', 'drinks'];

export const Menu = ({ onOrderUpdate }: IMenuProps) => {
  const { categoryMapByName } = useCatalog();
  const { setOrderingStatus } = useOrdering();

  useEffect(() => {
    const checkAcceptingOrders = async () => {
      try {
        const _response = await Api.acceptingOrders();
        logger.log('[acceptingOrders response]:::: ', _response);
        setOrderingStatus(_response.data);
      } catch (err: any) {
        logger.error(err);
        setOrderingStatus({
          pickupEvent: null,
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
                    <div className={styles.flavorWrap}>
                      <div className={styles.flavorImgWrap}>
                        <img
                          src='https://res.cloudinary.com/kcsommers/image/upload/v1625978476/Sonrisa/rotating-special.png'
                          alt='Rotating Special'
                        />
                      </div>
                      <p>Rotating Special</p>
                    </div>
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
