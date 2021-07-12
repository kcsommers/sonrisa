import { logger, useCatalog, useOrdering } from '@core';
import { setAcceptingOrders, setOrder } from '@redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRouter } from './AppRouter';

export const App = () => {
  const { getOrderId, getOrderById, checkAcceptingOrders } = useOrdering();

  const { setCatalogObjects } = useCatalog();

  const dispatch = useDispatch();

  useEffect(() => {
    const _orderId = getOrderId();
    if (!_orderId) {
      return;
    }
    getOrderById(_orderId)
      .then((order) => dispatch(setOrder(order)))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on init effect
  useEffect(() => {
    // check to see if orders can be accepted
    checkAcceptingOrders()
      .then((res) => {
        dispatch(setAcceptingOrders(res.acceptingOrders, res.reason));
      })
      .catch((err) => logger.error(err));
    // set the catalog objects
    setCatalogObjects()
      .then((res) => logger.log('[Got menu]'))
      .catch((err) => logger.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <AppRouter></AppRouter>
    </div>
  );
};
