import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import {
  CreateOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  Customer,
  Order,
  Payment,
  RetrieveOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from 'square';
import { v4 as uuidV4 } from 'uuid';
import { getCamelcaseKeys, sendEmail } from '../../core/public';
import { environments } from '../../environments';
import { square } from '../../square';

const router: Router = Router();

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

      const _camelCaseOrder = getCamelcaseKeys(_resParsed.order) as Order;
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

      const _request = <UpdateOrderRequest>{
        idempotencyKey: uuidV4(),
        order: {
          locationId: environments[process.env.NODE_ENV].SQUARE_LOCATION_ID,
          version: _version,
          ..._data,
        },
      };

      const _response = await square.ordersApi.updateOrder(_orderId, _request);
      console.log('[update order response]:::: ', _response.body);

      const _resParsed = JSON.parse(
        _response.body as string
      ) as UpdateOrderResponse;

      const _camelCaseOrder = getCamelcaseKeys(_resParsed.order) as Order;
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

      const _camelCaseOrder = getCamelcaseKeys(_resParsed.order) as Order;
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
    const _request = req.body.request as CreatePaymentRequest;
    const _customer = req.body.customer as Customer;

    // if one doesn't exist send bad request status
    if (!_request || !_customer) {
      return res.status(HttpStatusCodes.BAD_REQUEST);
    }

    try {
      // create the payment through square
      const _response = await square.paymentsApi.createPayment(_request);
      console.log('[create payment response]:::: ', _response.body);

      // parse the response
      const _resParsed = JSON.parse(
        _response.body as string
      ) as CreatePaymentResponse;

      // convert underscores to camelcase
      const _camelCasePayment = getCamelcaseKeys(_resParsed.payment) as Payment;
      if (!_camelCasePayment) {
        console.error('Error converting to camel case');
        return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }

      if (!_resParsed.errors || !_resParsed.errors.length) {
        // no errors so far, send an email to customer
        sendEmail(
          _customer.emailAddress,
          'Thank you for your order!',
          'Your order has been placed successfully',
          '<h1>Your order has been placed successfully</h1>'
        )
          .then((emailRes) => {
            console.log('EMAIL RESPONSE:::: ', emailRes);
            res.json({ errors: _resParsed.errors, payment: _camelCasePayment });
          })
          .catch((err) => {
            // if email errors, send payment success response but include email error
            console.error('EMAIL ERROR:::: ', err);

            (_resParsed.errors || []).push({
              category: 'EMAIL',
              code: 'EMAIL',
            });
            res.json({ errors: _resParsed.errors, payment: _camelCasePayment });
          });

        return;
      }

      res.json({ errors: _resParsed.errors, payment: _camelCasePayment });
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
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

export default router;
