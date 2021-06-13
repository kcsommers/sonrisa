import { Router, Response, Request } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { IOrderableItem } from '../../models/OrderableItem';
import Order from '../../models/Order';

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
      ? await Order.insertMany([{ items: _itemsMapped }])
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
    return res.status(HttpStatusCodes.BAD_REQUEST).send('Ivalid Order Id');
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
      return res.status(HttpStatusCodes.BAD_REQUEST).send('Ivalid Order Id');
    }

    res.json(_order);
  } catch (err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

// @route   DELETE api/order/:id
// @desc    Deletes an order by id
// @access  Public
router.delete('/:id', async (req: Request, res: Response) => {
  const _orderId = req.params.id;

  if (!_orderId) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send('Ivalid Order Id');
  }

  try {
    const _result = await Order.findOneAndDelete({ _id: _orderId });

    if (!_result) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send('Ivalid Order Id');
    }

    res.json(_result);
  } catch (err) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

export default router;
