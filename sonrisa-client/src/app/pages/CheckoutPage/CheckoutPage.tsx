import { CheckoutForm, OrderView } from '@components';
import {
  Api,
  getOrderTip,
  getOrderTotal,
  getPickupTime,
  logger,
  OrderFullfillmentScheduleTypes,
  OrderFullfillmentTypes,
  useOrdering,
} from '@core';
import { RouteComponentProps } from 'react-router-dom';
import { CreatePaymentRequest, Customer } from 'square';
import { v4 as uuidV4 } from 'uuid';
import styles from './CheckoutPage.module.scss';

export const CheckoutPage = (props: RouteComponentProps) => {
  const { currentOrder } = useOrdering();

  const formSubmitted = (
    customer: Customer,
    message: string,
    cardToken: string
  ) => {
    if (!currentOrder) {
      return;
    }

    // first update the order with fulfillments and customer info
    const _fulfillments = [
      {
        type: OrderFullfillmentTypes.PICKUP,
        pickupDetails: {
          scheduleType: OrderFullfillmentScheduleTypes.SCHEDULED,
          pickupAt: getPickupTime(),
          note: 'Arf burf grrr',
          recipient: {
            displayName: 'Joni Blue',
            emailAddress: 'joni@gmail.com',
            phoneNumber: '3308192592',
          },
        },
      },
    ];

    Api.updateOrder(currentOrder.id as string, currentOrder.version as number, {
      fulfillments: _fulfillments,
    }).then();

    const _totalMoney = getOrderTotal(currentOrder);
    const _tipMoney = getOrderTip(currentOrder);

    const request: CreatePaymentRequest = {
      idempotencyKey: uuidV4(),
      sourceId: cardToken,
      orderId: currentOrder?.id,
      amountMoney: {
        currency: 'USD',
        amount: String(_totalMoney - _tipMoney),
      },
      tipMoney: {
        currency: 'USD',
        amount: String(_tipMoney),
      },
    };

    Api.createPayment(request, customer)
      .then((res) => {
        logger.log('[create payment response]:::: ', res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.checkoutPageWrap}>
      <div className={styles.checkoutPageInner}>
        <div className={`${styles.paymentSection} ${styles.checkoutSection}`}>
          <h4>Payment</h4>
          <div className={styles.checkoutFormWrap}>
            <CheckoutForm formSubmitted={formSubmitted} />
          </div>
        </div>
        <div className={`${styles.orderSection} ${styles.checkoutSection}`}>
          <h4>Order</h4>
          <OrderView />
        </div>
      </div>
    </div>
  );
};
