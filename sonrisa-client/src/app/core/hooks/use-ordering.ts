import { setOrderItems, useAppDispatch, useAppSelector } from '@redux';
import { cloneDeep } from 'lodash';
import { batch } from 'react-redux';
import { Api } from '../api/api';
import { IOrder } from '../ordering/IOrder';
import { IOrderableItem } from '../ordering/IOrderableItem';
import { useStorage } from './use-storage';
import { setOrderId } from './../../redux/order/order';

export interface IOrderingHook {
  orderState: IOrder | undefined;

  updateOrder: (item: IOrderableItem, quantity: number) => void;
}

export const useOrdering = (): IOrderingHook => {
  const orderState = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();

  const { storageKeys, setSessionItem } = useStorage();

  const updateOrder = (item: IOrderableItem, quantity: number): void => {
    if (!orderState) {
      return;
    }

    const _clonedItems = cloneDeep(orderState.items);

    // look for item in cart
    let _orderItemIndex = _clonedItems.findIndex(
      (i) => i.item._id === item._id
    );

    // if it exists, set the quantity
    if (_orderItemIndex > -1) {
      _clonedItems[_orderItemIndex].quantity = quantity;
    } else {
      // otherwise create new item
      _clonedItems.push({
        item: item,
        quantity: quantity,
      });
    }

    Api.updateOrder(orderState._id, _clonedItems)
      .then((res) => {
        const _order = res.data;
        setSessionItem(storageKeys.ORDER_NUMBER, _order._id);

        batch(() => {
          dispatch(setOrderItems(_clonedItems));

          if (!orderState._id) {
            dispatch(setOrderId(_order._id));
          }
        });
      })
      .catch((err) => console.error(err));
  };

  return {
    orderState,
    updateOrder,
  };
};
