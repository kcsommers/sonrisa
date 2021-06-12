import { Router, Response, Request } from 'express';

const router: Router = Router();

// @route   POST api/order/update
// @desc    Creates or updates an order
// @access  Public
router.post('/update', (req: Request, res: Response) => {
  console.log('REQ>BODY:::; ', req.body);
  res.send('WORRRRDD:::::');
});

export default router;
