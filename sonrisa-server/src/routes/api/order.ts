import { getCamelcaseKeys } from '../../core/public';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import {
  CreateOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Customer,
  Order,
  OrderLineItem,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from 'square';
import { v4 as uuidV4 } from 'uuid';
import { environments } from '../../environments';
import { square } from '../../square';
import JSONBig from 'json-bigint';
import { OrderFullfillmentTypes } from '../../core/orders/OrderFullfillmentTypes';
import { OrderFullfillmentScheduleTypes } from '../../core/orders/OrderFullfillmentScheduleTypes';

const router: Router = Router();

/**
 * @route  POST api/order/create
 * @access PUBLIC
 * @description ureates an order
 */
router.post('/create', async (req: Request, res: Response<Order>) => {
  const _lineItems = req.body.lineItems;
  const _today = new Date();
  const _nextweek = new Date(
    _today.getFullYear(),
    _today.getMonth(),
    _today.getDate() + 7
  );

  const _orderData: Order = {
    locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
    lineItems: _lineItems,
    fulfillments: [
      {
        type: OrderFullfillmentTypes.PICKUP,
        pickupDetails: {
          scheduleType: OrderFullfillmentScheduleTypes.SCHEDULED,
          pickupAt: _nextweek.toISOString(),
          note: 'Arf burf grrr',
          recipient: {
            displayName: 'Joni Blue',
            emailAddress: 'joni@gmail.com',
            phoneNumber: '3308192592',
          },
        },
      },
    ],
  };

  try {
    const _response = await square.ordersApi.createOrder({
      order: _orderData,
      idempotencyKey: uuidV4(),
    });
    console.log('[create order response]:::: ', _response.body);
    const _responseParsed = <CreateOrderResponse>(
      JSON.parse(<string>_response.body)
    );
    const _camelCaseOrder = <Order>getCamelcaseKeys(_responseParsed.order);

    res.send(_camelCaseOrder);
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/**
 * @route POST api/order/update
 * @access PUBLIC
 * @description updates an order by id
 */
router.post('/update', async (req: Request, res: Response<Order>) => {
  try {
    const _orderId = <string>req.body.orderId;
    const _lineItems = <OrderLineItem[]>req.body.items;
    const _version = <number>req.body.version;

    const _request = <UpdateOrderRequest>{
      idempotencyKey: uuidV4(),
      order: {
        locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
        lineItems: _lineItems,
        version: _version,
      },
    };

    const _response = await square.ordersApi.updateOrder(_orderId, _request);
    console.log('[update order response]:::: ', _response.body);
    const _order = JSON.parse(<string>_response.body).order;
    const _camelCaseOrder = <Order>getCamelcaseKeys(_order);
    res.send(_camelCaseOrder);
  } catch (err) {
    console.error(err);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/**
 * @route GET api/order/:id
 * @access PUBLIC
 * @description Retrieves an order by id
 */
router.get('/:id', async (req: Request, res: Response<Order>) => {
  const _orderId = req.params.id;

  if (!_orderId) {
    return res.sendStatus(HttpStatusCodes.BAD_REQUEST);
  }

  try {
    const _response = await square.ordersApi.retrieveOrder(_orderId);

    console.log('[get order response]:::: ', _response.body);
    const _resParsed = <UpdateOrderResponse>JSON.parse(<string>_response.body);
    const _camelCaseOrder = <Order>getCamelcaseKeys(_resParsed.order);

    if (!_camelCaseOrder) {
      console.error('Error converting to camel case');
      return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    res.send(_camelCaseOrder);
  } catch (err) {
    console.error(err);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/**
 * @route POST api/order/payments
 * @access PUBLIC
 * @description Creates a square payment using the CreatePaymentRequest
 * and the Customer provided in the request body
 *
 */
router.post('/payments', async (req: Request, res: Response) => {
  const _request = req.body.request as CreatePaymentRequest;
  const _customer = req.body.customer as Customer;

  if (!_request || !_customer) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send('Location id and card token required');
  }

  try {
    const _result = await square.paymentsApi.createPayment(_request);
    const _resultParsed = JSON.parse(JSONBig.stringify(_result));

    console.log('create payment response:::: ', _resultParsed);

    res.json(_resultParsed);
  } catch (err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

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

export default router;
