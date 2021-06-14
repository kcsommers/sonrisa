import { useEffect } from 'react';
import { AppRouter } from './AppRouter';
import { useOrdering, Api } from '@core';
import { useDispatch } from 'react-redux';
import { setOrder } from '@redux';

export const App = () => {
  const { getOrderId } = useOrdering();

  const dispatch = useDispatch();

  useEffect(() => {
    const btns = document.querySelectorAll('button');
    btns.forEach((b) => {
      b.addEventListener('click', () => b.blur());
    });
    return () => {};
  }, []);

  useEffect(() => {
    const _orderId = getOrderId();

    if (!_orderId) {
      return;
    }

    Api.getOrder(_orderId)
      .then((res) => dispatch(setOrder(res.data)))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <AppRouter></AppRouter>
    </div>
  );
};
