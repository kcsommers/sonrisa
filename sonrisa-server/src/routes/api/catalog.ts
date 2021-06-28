import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { square } from '../../square';
import { CatalogImage, CatalogItem, CatalogObject } from 'square';
const JSONbig = require('json-bigint');

class CatalogItemTypes {
  public static ITEM = 'ITEM';

  public static IMAGE = 'IMAGE';
}

const router: Router = Router();

/**
 * @route POST api/order/create
 * @access PUBLIC
 * @description Fetches the entire square catalog and returns as a json string
 * Because of limitation on bigint serialization the price is converted to a string
 * and must be converted back to bigint client side
 */
router.get(
  '/',
  async (req: Request, res: Response<CatalogObject[] | Error>) => {
    try {
      const _res = await square.catalogApi.listCatalog('', 'image,item');
      const _items = _res.result.objects;

      res.send(JSON.parse(JSONbig.stringify(_items)));
    } catch (err) {
      console.error(err.message);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export default router;
