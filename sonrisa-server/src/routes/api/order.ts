import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { CreatePaymentRequest } from 'square';
import { v4 as uuidV4 } from 'uuid';
import Order from '../../models/Order';
import { IOrderableItem } from '../../models/OrderableItem';
import { square } from '../../square';

const router: Router = Router();

// @route   POST api/order/update
// @desc    Creates or updates an order
// @access  Public
router.post('/update', async (req: Request, res: Response) => {
  try {
    const _orderId: string = req.body.orderId;
    const _items: { item: IOrderableItem; quantity: number }[] = req.body.items;

    // only store item ids in db
    const _itemsMapped = _items.map((i) => ({
      item: i.item._id,
      quantity: i.quantity,
    }));

    const _order = !_orderId
      ? await Order.create({ items: _itemsMapped })
      : await Order.findOneAndUpdate(
          { _id: _orderId },
          { items: _itemsMapped }
        );

    res.json(_order);
  } catch (err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

// @route   GET api/order/:id
// @desc    Retrieves an order by id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  const _orderId = req.params.id;

  if (!_orderId) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send('Invalid Order Id');
  }

  try {
    const _order = await Order.findById(_orderId).populate({
      path: 'items',
      populate: {
        path: 'item',
        model: 'OrderableItem',
      },
    });

    if (!_order) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send('Invalid Order Id');
    }

    res.json(_order);
  } catch (err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
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
    const _result =
      _orderId === '-1'
        ? await Order.deleteMany()
        : await Order.findOneAndDelete({ _id: _orderId });

    if (!_result) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send('Invalid Order Id');
    }

    res.json(_result);
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
