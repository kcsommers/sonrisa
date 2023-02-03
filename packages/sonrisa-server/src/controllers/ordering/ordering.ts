import {
  DateHelper,
  IOrderingStatus,
  IPickupEvent,
  NotAcceptingOrdersReasons,
} from '@sonrisa/core';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import {
  BatchRetrieveOrdersResponse,
  CreateOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Customer,
  GetPaymentResponse,
  Order,
  OrderLineItem,
  Payment,
  RetrieveOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from 'square';
import { v4 as uuidV4 } from 'uuid';
import { PickupEventModel } from '../../database/models';
import { environments } from '../../environments';
import { square } from '../../square';
import { camelcaseKeys } from '../../utils';
import { sendEmail } from '../contact';

const router: Router = Router();

const getOrdersForEvent = async (
  pickupEvent: IPickupEvent
): Promise<BatchRetrieveOrdersResponse> => {
  // const orders = await square.ordersApi.searchOrders({
  //   locationIds: [environments[process.env.NODE_ENV].SQUARE_LOCATION_ID],
  //   query: {
  //     filter: {
  //       fulfillmentFilter: {
  //         fulfillmentTypes: [OrderFulfillmentTypes.PICKUP],
  //       },
  //     },
  //     sort: {
  //       sortField: 'CREATED_AT',
  //       sortOrder: 'DESC',
  //     },
  //   },
  // });
  console.log('::::getting orders for event:::: ', pickupEvent?.orders?.length);
  if (!pickupEvent || !pickupEvent.orders || !pickupEvent.orders.length) {
    return { orders: [] };
  }
  const orders = await square.ordersApi.batchRetrieveOrders({
    locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
    orderIds: pickupEvent?.orders || [],
  });
  const ordersParsed = JSON.parse(
    orders.body as string
  ) as BatchRetrieveOrdersResponse;
  console.log('total orders retrieved::::: ', ordersParsed.orders?.length);
  return ordersParsed;
  // const forPickupEvent = ordersParsed.orders.filter((o) => {
  //   return o.metadata && o.metadata.pickupEventId === pickupEventId;
  // });
  // console.log('total orders for event::::: ', forPickupEvent?.length);
  // return forPickupEvent;
};

const getTotalItems = (orders: Order[]): number => {
  let totalItems = 0;
  (orders || []).forEach((order) => {
    if ((order as any).line_items || order.lineItems) {
      ((order as any).line_items || order.lineItems).forEach(
        (item: OrderLineItem) => {
          totalItems += +item.quantity;
        }
      );
    }
  });
  console.log('total items ordered::::: ', totalItems);
  return totalItems;
};

/**
 * @route  GET api/order/create
 * @access PUBLIC
 * @description returns a boolean indicating whether or not orders
 * are currently being taken
 */
router.get(
  '/accepting',
  async (req: Request, res: Response<IOrderingStatus>) => {
    if (process.env.NODE_ENV === 'development') {
      const startTimeModel = new Date();
      startTimeModel.setDate(startTimeModel.getDate() + 1);
      const endTimeModel = new Date(startTimeModel);
      endTimeModel.setHours(startTimeModel.getHours() + 4);
      return res.json({
        acceptingOrders: true,
        pickupEvent: {
          startTime: startTimeModel,
          endTime: endTimeModel,
          location: {
            name: 'Test Location',
            address: {
              street: '18302 9th Ave NE',
              city: 'Shoreline',
              state: 'WA',
              zip: '98155',
            },
            _id: uuidV4(),
          },
          orders: [],
          soldOut: false,
          _id: uuidV4(),
        },
        message: '',
        errors: null,
        remainingItems: 50,
      });
    }

    console.log(':::: sure did hit accepting orders route:::::');
    // res.json({
    //   acceptingOrders: false,
    //   pickupEvent: null,
    //   message: NotAcceptingOrdersReasons.CHECK_BACK,
    //   errors: null,
    // });
    try {
      const upcomingEvents = await PickupEventModel.find(
        { startTime: { $gte: Date.now() } },
        null,
        { sort: { startTime: 1 } }
      ).populate('location');
      if (
        !upcomingEvents ||
        !upcomingEvents.length ||
        upcomingEvents[0].soldOut
      ) {
        res.json({
          acceptingOrders: false,
          pickupEvent: null,
          message: NotAcceptingOrdersReasons.SOLD_OUT,
          errors: null,
        });
        return;
      }
      const pickupEvent = upcomingEvents && upcomingEvents[0];
      // return res.json({
      //   acceptingOrders: true,
      //   pickupEvent: pickupEvent,
      //   errors: null,
      // });

      const ordersRes = await getOrdersForEvent(pickupEvent);
      const totalItems = getTotalItems(ordersRes.orders);
      if (totalItems >= 50) {
        res.json({
          acceptingOrders: false,
          pickupEvent,
          message: NotAcceptingOrdersReasons.SOLD_OUT,
          errors: null,
        });
      } else {
        res.json({
          acceptingOrders: true,
          pickupEvent,
          message: '',
          errors: null,
          remainingItems: 50 - totalItems,
        });
      }
    } catch (error: any) {
      console.error('accepting orders route error:::: ', error);
      res.json({
        acceptingOrders: false,
        pickupEvent: null,
        message: NotAcceptingOrdersReasons.CHECK_BACK,
        errors: null,
      });
    }
  }
);

/**
 * @route  POST api/order/create
 * @access PUBLIC
 * @description creates an order
 */
router.post(
  '/create',
  async (req: Request, res: Response<CreateOrderResponse>) => {
    const { lineItems, pickupEvent } = req.body;

    const orderData: Order = {
      locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
      lineItems: lineItems,
      pricingOptions: {
        autoApplyDiscounts: true,
        autoApplyTaxes: true,
      },
    };

    try {
      const _response = await square.ordersApi.createOrder({
        order: orderData,
        idempotencyKey: uuidV4(),
      });
      console.log('[create order response]:::: ', _response.body);

      const _resParsed = JSON.parse(
        _response.body as string
      ) as CreateOrderResponse;

      const _camelCaseOrder = camelcaseKeys(_resParsed.order) as Order;
      if (!_camelCaseOrder) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }

      res.json({ errors: _resParsed.errors, order: _camelCaseOrder });
    } catch (error) {
      console.error(error);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

const updateOrder = async (
  orderId: string,
  version: number,
  newData: any
): Promise<UpdateOrderResponse> => {
  const request = <UpdateOrderRequest>{
    idempotencyKey: uuidV4(),
    order: {
      locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
      version,
    },
  };

  // check for fields to clear
  if (newData.fieldsToClear) {
    request.fieldsToClear = newData.fieldsToClear;
  } else {
    request.order = {
      ...request.order,
      ...newData,
    };
  }

  const _response = await square.ordersApi.updateOrder(orderId, request);
  console.log('[update order response]:::: ', _response.body);
  const resParsed = JSON.parse(_response.body as string) as UpdateOrderResponse;
  return resParsed;
};

/**
 * @route POST api/order/update
 * @access PUBLIC
 * @description updates an order by id
 */
router.post(
  '/update',
  async (req: Request, res: Response<UpdateOrderResponse>) => {
    try {
      const { data, orderId, version } = req.body;
      const updatedOrderRes = await updateOrder(orderId, version, data);
      const camelCaseOrder = camelcaseKeys(updatedOrderRes.order) as Order;
      if (!camelCaseOrder) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      res.json({ errors: updatedOrderRes.errors, order: camelCaseOrder });
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

const getOrder = async (orderId: string): Promise<RetrieveOrderResponse> => {
  const response = await square.ordersApi.retrieveOrder(orderId);
  console.log('[get order response]:::: ', response.body);
  const resParsed = JSON.parse(
    response.body as string
  ) as RetrieveOrderResponse;
  return resParsed;
};

/**
 * @route GET api/order/:id
 * @access PUBLIC
 * @description Retrieves an order by id
 */
router.get(
  '/:id',
  async (req: Request, res: Response<RetrieveOrderResponse>) => {
    const orderId = req.params.id;
    if (!orderId) {
      return res.sendStatus(HttpStatusCodes.BAD_REQUEST);
    }
    try {
      const orderRes = await getOrder(orderId);
      const camelCaseOrder = camelcaseKeys(orderRes.order) as Order;
      if (!camelCaseOrder) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      res.json({ errors: orderRes.errors, order: camelCaseOrder });
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

const getPayment = async (paymentId: string): Promise<GetPaymentResponse> => {
  const response = await square.paymentsApi.getPayment(paymentId);
  console.log('[get payment response]:::: ', response.body);
  const resParsed = JSON.parse(response.body as string) as GetPaymentResponse;
  return resParsed;
};

/**
 * @route GET api/order/payments/:id
 * @access PUBLIC
 * @description Retrieves a payment by id
 */
router.get(
  '/payments/:id',
  async (req: Request, res: Response<GetPaymentResponse>) => {
    const paymentId = req.params.id;
    if (!paymentId) {
      return res.sendStatus(HttpStatusCodes.BAD_REQUEST);
    }
    try {
      const paymentRes = await getPayment(paymentId);
      const camelCasePayment = camelcaseKeys(paymentRes.payment) as Order;
      if (!camelCasePayment) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      res.json({ errors: paymentRes.errors, payment: camelCasePayment });
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

/**
 * @route POST api/order/payments
 * @access PUBLIC
 * @description Creates a square payment using the CreatePaymentRequest
 * and the Customer provided in the request body
 * Adds the orderId to the associated pickup event in db
 *
 */
router.post(
  '/payments',
  async (req: Request, res: Response<CreatePaymentResponse>) => {
    // get the request and the customer from the req body
    const request = req.body.request as CreatePaymentRequest;
    const customer = req.body.customer as Customer;
    const pickupEvent = req.body.pickupEvent as IPickupEvent;

    // if one doesn't exist send bad request status
    if (!request || !customer) {
      return res.status(HttpStatusCodes.BAD_REQUEST);
    }

    try {
      const orderRes = await getOrder(request.orderId);
      await updateOrder(orderRes.order.id, orderRes.order.version, {
        metadata: { pickupEventId: pickupEvent._id },
      });
      // create the payment through square
      const _response = await square.paymentsApi.createPayment(request);
      console.log('[create payment response]:::: ', _response.body);

      // parse the response
      const resParsed = JSON.parse(
        _response.body as string
      ) as CreatePaymentResponse;
      console.log(
        '[create receipt]:::: ',
        resParsed,
        resParsed.payment.receiptUrl
      );

      // convert underscores to camelcase
      const _camelCasePayment = camelcaseKeys(resParsed.payment) as Payment;
      if (!_camelCasePayment) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }

      if (resParsed.errors && resParsed.errors.length) {
        res.json({ errors: resParsed.errors, payment: _camelCasePayment });
        return;
      }

      // no errors so far, send an email to customer
      sendEmail(
        customer.emailAddress,
        'Thank you for your order!',
        'Your order has been placed successfully',
        `
            <div style="position: relative;">
                <div
                  style="
                    position: relative;
                    z-index: 1;
                    font-family: sans-serif;
                    color: #573f08;
                    line-height: calc(100% + 10px);
                    font-size: 16px;
                  "
                >
                  <div style="text-align: center;">
                    <img
                      style="width: 150px;"
                      src="https://res.cloudinary.com/kcsommers/image/upload/v1627269079/Sonrisa/sonrisa_yellow_circle.png"
                    />
                  </div>
                  <h3 style="font-family: sans-serif; font-size: initial">
                    Your order has been placed successfully. Your order number is ${
                      _camelCasePayment.orderId
                    }
                  </h3>
                  <a href="${
                    _camelCasePayment.receiptUrl
                  }" style="color: inherit"> Click here to view your receipt</a>
                  <div
                    style="
                      font-family: sans-serif;
                    "
                  >
                    Thank you for your order! You've made me smile. I hope my sonrisa brings you sonrisa. &#9786;<br />Here are the pickup details for your order:
                    <h4>${DateHelper.getDateString(pickupEvent.startTime)}</h4>
                    <div>
                      ${DateHelper.getTimeString(pickupEvent.startTime)} -
                      ${DateHelper.getTimeString(pickupEvent.endTime)}
                    </div>
                    <a
                      style="color: #282c34; text-decoration: none; font-style: italic;"
                      href="https://maps.google.com/?q=${
                        pickupEvent?.location.address.street
                      }, ${pickupEvent?.location.address.city}, ${
          pickupEvent?.location.address.state
        }, ${pickupEvent?.location.address.zip}"
                      target='_blank'
                    >
                      ${pickupEvent.location.name}<br />
                      ${pickupEvent.location.address.street}<br />
                      ${pickupEvent.location.address.city}, ${
          pickupEvent.location.address.state
        } ${pickupEvent.location.address.zip}
                    </a>
                    </div>
                    <div>
                    If you have any questions or would like to make a change to your order, please contact us here:
                    <a
                      href="tel:2534595365"
                     style="
                      margin: 1rem 0;
                      font-family: sans-serif;
                      font-size: 16px;
                      color: #282c34;
                      display: block;
                      text-decoration: none;
                    ">
                      (253) 459-5365
                    </a>
                    Thanks again, see you soon!
                    </div>
                  </div>
                </div>
            </div>
          `
      )
        .then((emailRes) => {
          console.log('EMAIL RESPONSE:::: ', emailRes);
          res.json({ errors: resParsed.errors, payment: _camelCasePayment });
        })
        .catch((err) => {
          // if email errors, send payment success response but include email error
          console.error('EMAIL ERROR:::: ', err);

          (resParsed.errors || []).push({
            category: 'EMAIL',
            code: 'EMAIL',
          });
          res.json({ errors: resParsed.errors, payment: _camelCasePayment });
        })
        .finally(async () => {
          if (process.env.NODE_ENV !== 'production') {
            return;
          }
          const updatedEvent = await PickupEventModel.findOneAndUpdate(
            {
              _id: pickupEvent._id,
            },
            {
              $push: { orders: [request.orderId] },
            }
          );
          const ordersRes = await getOrdersForEvent(updatedEvent);
          const totalItems = getTotalItems([...(ordersRes?.orders || [])]);
          PickupEventModel.findOneAndUpdate(
            {
              _id: pickupEvent._id,
            },
            { soldOut: totalItems >= 50 }
          );
        });
    } catch (err) {
      console.error('PAYMENT ERROR:::: ', err);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

/**
 * @route DELETE api/order/:id
 * @access PUBLIC
 * @description Deletes an order by id. Id of -1 deletes all
 *
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const _orderId = req.params.id;

  if (!_orderId) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send('Invalid Order Id');
  }

  try {
    // const _result =
    //   _orderId === '-1'
    //     ? await Order.deleteMany()
    //     : await Order.findOneAndDelete({ _id: _orderId });
    // if (!_result) {
    //   return res.status(HttpStatusCodes.BAD_REQUEST).send('Invalid Order Id');
    // }
    // res.json(_result);
  } catch (err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

export const orderingRouter = router;
