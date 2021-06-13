import { Api, IOrder, IOrderableItem } from '@core';
import { cloneDeep } from 'lodash';
import { ComponentType } from 'react';

export interface IWithOrdering {
  updateOrder?: (
    orderState: IOrder | undefined,
    item: IOrderableItem,
    quantity: number
  ) => void;
}

export function withOrdering<T>(Component: ComponentType<T & IWithOrdering>) {
  const updateOrder = (
    orderState: IOrder | undefined,
    item: IOrderableItem,
    quantity: number
  ): void => {
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
        console.log('RESULT:::: ', res);
        // dispatch(setOrderItems(clonedItems));
      })
      .catch((err) => console.error(err));
  };

  return (props: T) => <Component {...props} updateOrder={updateOrder} />;
}
