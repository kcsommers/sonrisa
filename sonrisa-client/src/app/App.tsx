import { useOrdering } from '@core';
import { setOrder } from '@redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRouter } from './AppRouter';

export const App = () => {
  const { getOrderId, getOrderById, checkAcceptingOrders } = useOrdering();

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

  return (
    <div className="app-container">
      <AppRouter></AppRouter>
    </div>
  );
};
