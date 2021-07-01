import { getCamelcaseKeys } from '../../core/public';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import {
  CreateOrderResponse,
  CreatePaymentRequest,
  Order,
  OrderLineItem,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from 'square';
import { v4 as uuidV4 } from 'uuid';
import { environments } from '../../environments';
import { square } from '../../square';

const router: Router = Router();
// @route   POST api/order/create
// @desc    Creates an order
// @access  Public
router.post('/create', async (req: Request, res: Response<Order>) => {
  const _lineItems = req.body.lineItems;
  const _orderData = <Order>{
    locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
    lineItems: _lineItems,
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

// @route   PUT api/order/update
// @desc    updates an order by id
// @access  Public
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
    res.send(_order);
  } catch (err) {
    console.error(err);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

// @route   GET api/order/:id
// @desc    Retrieves an order by id
// @access  Public
router.get('/:id', async (req: Request, res: Response<Order>) => {
  const _orderId = req.params.id;

  if (!_orderId) {
    return res.sendStatus(HttpStatusCodes.BAD_REQUEST);
  }

  try {
    const _response = await square.ordersApi.retrieveOrder(_orderId);

    console.log('[create order response]:::: ', _response.body);
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

// @route   DELETE api/order/:id
// @desc    Deletes an order by id. Id of -1 deletes all
// @access  Public
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

router.post('/payments', async (req: Request, res: Response) => {
  const _locationId = req.body.locationId;
  const _cardToken = req.body.cardToken;

  if (!_locationId || !_cardToken) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send('Location id and card token required');
  }

  const payment: CreatePaymentRequest = {
    idempotencyKey: uuidV4(),
    locationId: _locationId,
    sourceId: _cardToken,
    amountMoney: {
      amount: BigInt(100),
      currency: 'USD',
    },
  };

  try {
    const { result } = await square.paymentsApi.createPayment(payment);
    res.send(
      JSON.stringify(result, (k, v) =>
        typeof v === 'bigint' ? +v.toString() : v
      )
    );
  } catch (err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

export default router;
