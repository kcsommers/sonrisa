import { useEffect } from 'react';
import { AppRouter } from './AppRouter';
import { useOrdering, Api } from '@core';
import { useDispatch } from 'react-redux';
import { setOrder } from '@redux';

export const App = () => {
  const { getOrderId, getOrderById } = useOrdering();

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
