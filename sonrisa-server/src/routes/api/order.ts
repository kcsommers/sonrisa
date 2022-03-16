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
import {
  camelcaseKeys,
  sendEmail,
  IAcceptingOrdersResponse,
  NotAcceptingOrdersReasons,
} from '../../core/public';
import { environments } from '../../environments';
import { square } from '../../square';

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
  (req: Request, res: Response<IAcceptingOrdersResponse>) => {
    res.json({
      acceptingOrders: false,
      reason: NotAcceptingOrdersReasons.SOLD_OUT,
      errors: null,
    });

    const _badDays = [0, 1]; // Sunday & Monday

    const _date = new Date(
      new Date().toLocaleString('en-us', { timeZone: 'America/Los_Angeles' })
    );

    let _acceptingOrders = true;
    let _reason = '';
    // check the day
    if (_badDays.indexOf(_date.getDay()) > -1) {
      _acceptingOrders = false;
      _reason = NotAcceptingOrdersReasons.INVALID_DAY;
    }

    // @TODO check how many have been ordered this week

    res.json({
      acceptingOrders: _acceptingOrders,
      reason: _reason,
      errors: null,
    });
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
    const _request = req.body.request as CreatePaymentRequest;
    const _customer = req.body.customer as Customer;

    console.log('req:::: ', _request);

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
      console.log(
        '[create receipt]:::: ',
        _resParsed,
        _resParsed.payment.receiptUrl
      );

      // convert underscores to camelcase
      const _camelCasePayment = camelcaseKeys(_resParsed.payment) as Payment;
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
                    Your order has been placed successfully. Your order number is ${_camelCasePayment.orderId}
                  </h3>
                  <a href="${_camelCasePayment.receiptUrl}" style="color: inherit"> Click here to view your receipt</a>
                  <p
                    style="
                      font-family: sans-serif;
                    "
                  >
                    Thank you for your order! You've made me smile. I hope my sonrisa
                    brings you sonrisa. &#9786;<br />Your order will be available for pickup on Monday between 1pm and 4pm in Capitol Hill, Seattle. Location:
                    <div style="
                      margin: 1rem 0;
                      font-family: sans-serif;
                      font-size: 16px;
                    ">
                      120 10th Ave E <br />
                      Seattle, WA 98102
                    </div>
                    If you have any additional questions or would like to make a change to your order, please feel free to contact us here:
                    <div style="
                      margin: 1rem 0;
                      font-family: sans-serif;
                      font-size: 16px;
                    ">
                      (253) 459-5365
                    </div>
                    Thanks again, see you on Monday!
                  </p>
                </div>
            </div>
          `
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

export default router;
