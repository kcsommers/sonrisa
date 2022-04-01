import {
  IOrderingStatus,
  IPickupEvent,
  DateHelper,
  NotAcceptingOrdersReasons,
} from '@sonrisa/core';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import {
  CreateOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Customer,
  Order,
  OrderLineItem,
  Payment,
  RetrieveOrderResponse,
  SearchOrdersResponse,
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

/**
 * @route  GET api/order/create
 * @access PUBLIC
 * @description returns a boolean indicating whether or not orders
 * are currently being taken. Returns false if number of orders exceeds ?
 * or if its Sunday or Monday
 */
router.get(
  '/accepting',
  async (req: Request, res: Response<IOrderingStatus>) => {
    // console.log('hit accepting orders route:::::');
    // res.json({
    //   acceptingOrders: false,
    //   pickupEvent: null,
    //   message: NotAcceptingOrdersReasons.CHECK_BACK,
    //   errors: null,
    // });
    const upcomingEvents: IPickupEvent[] = await PickupEventModel.find(
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
    // const allSoldOut: boolean = upcomingEvents.every(
    //   (event: IPickupEvent) => event.soldOut
    // );
    // if (pickupEvent.soldOut) {
    //   acceptingOrders = false;
    //   message = NotAcceptingOrdersReasons.SOLD_OUT;
    // }
    const orders = await square.ordersApi.searchOrders({
      locationIds: [environments[process.env.NODE_ENV].SQUARE_LOCATION_ID],
      query: {
        filter: {
          dateTimeFilter: {
            createdAt: {
              startAt: new Date('31 March 2022 00:00 UTC').toISOString(),
            },
          },
        },
        sort: {
          sortField: 'CREATED_AT',
          sortOrder: 'DESC',
        },
      },
    });
    const ordersParsed = JSON.parse(
      orders.body as string
    ) as SearchOrdersResponse;
    console.log(
      'startAtTime::::: ',
      new Date('31 March 2022 00:00 UTC').toISOString()
    );
    console.log('orders::::: ', ordersParsed.orders);
    console.log('total orders::::: ', ordersParsed.orders?.length);
    let totalItems = 0;
    if (ordersParsed && ordersParsed.orders && ordersParsed.orders.length) {
      ordersParsed.orders.forEach((order: Order) => {
        if ((order as any).line_items || order.lineItems) {
          ((order as any).line_items || order.lineItems).forEach(
            (item: OrderLineItem) => {
              totalItems += +item.quantity;
            }
          );
        }
      });
    }
    console.log('total boxes ordered::::: ', totalItems);
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
    const _lineItems = req.body.lineItems;

    const _orderData: Order = {
      locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
      lineItems: _lineItems,
      pricingOptions: {
        autoApplyDiscounts: true,
        autoApplyTaxes: true,
      },
    };

    try {
      const _response = await square.ordersApi.createOrder({
        order: _orderData,
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

/**
 * @route POST api/order/update
 * @access PUBLIC
 * @description updates an order by id
 */
router.post(
  '/update',
  async (req: Request, res: Response<UpdateOrderResponse>) => {
    try {
      const _data = req.body.data;
      const _orderId = <string>req.body.orderId;
      const _version = <number>req.body.version;
      console.log('[update order data]:::: ', _data);

      const _request = <UpdateOrderRequest>{
        idempotencyKey: uuidV4(),
        order: {
          locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
          version: _version,
        },
      };

      // check for fields to clear
      if (_data.fieldsToClear) {
        _request.fieldsToClear = _data.fieldsToClear;
      } else {
        _request.order = {
          ..._request.order,
          ..._data,
        };
      }

      const _response = await square.ordersApi.updateOrder(_orderId, _request);
      console.log('[update order response]:::: ', _response.body);

      const _resParsed = JSON.parse(
        _response.body as string
      ) as UpdateOrderResponse;

      const _camelCaseOrder = camelcaseKeys(_resParsed.order) as Order;
      if (!_camelCaseOrder) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }

      res.json({ errors: _resParsed.errors, order: _camelCaseOrder });
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

/**
 * @route GET api/order/:id
 * @access PUBLIC
 * @description Retrieves an order by id
 */
router.get(
  '/:id',
  async (req: Request, res: Response<RetrieveOrderResponse>) => {
    const _orderId = req.params.id;

    if (!_orderId) {
      return res.sendStatus(HttpStatusCodes.BAD_REQUEST);
    }

    try {
      const _response = await square.ordersApi.retrieveOrder(_orderId);
      console.log('[get order response]:::: ', _response.body);

      const _resParsed = JSON.parse(
        _response.body as string
      ) as RetrieveOrderResponse;

      const _camelCaseOrder = camelcaseKeys(_resParsed.order) as Order;
      if (!_camelCaseOrder) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }

      res.json({ errors: _resParsed.errors, order: _camelCaseOrder });
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

      // const pickupEventUpdateData: Partial<IPickupEvent> = {
      //   orders: [...(pickupEvent.orders || []), request.orderId],
      // };
      // // set === 49 so that sold out can be toggled off in admin page
      // if (pickupEvent.orders && pickupEvent.orders.length === 49) {
      //   pickupEventUpdateData.soldOut = true;
      // }

      // await PickupEventModel.findOneAndUpdate(
      //   {
      //     _id: pickupEvent._id,
      //   },
      //   pickupEventUpdateData
      // );

      // no errors so far, send an email to customer
      sendEmail(
        customer.emailAddress,
        'Thank you for your order!',
        'Your order has been placed successfully',
        `
            <div
              style="
                position: relative;
              ">
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
                    If you have any additional questions or would like to make a change to your order, please feel free to contact us here:
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
