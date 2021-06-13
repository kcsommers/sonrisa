import { Request, Response, Router } from 'express';
import OrderableItem from '../../models/OrderableItem';
import HttpStatusCodes from 'http-status-codes';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const items = await OrderableItem.find({});
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

export default router;
