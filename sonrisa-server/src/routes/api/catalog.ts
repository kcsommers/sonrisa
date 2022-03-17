import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import JSONBig from 'json-bigint';
import { CatalogImage, CatalogObject } from 'square';
import { getItemImageId, getItemVariationId } from '../../core/utils';
import { square } from '../../square';

interface IGetCatalogResponse {
  catalogItems: CatalogObject[];
  catalogImageMap: { [imageId: string]: CatalogImage };
}

class CatalogObjectTypes {
  public static ITEM = 'ITEM';
  public static IMAGE = 'IMAGE';
}

const router: Router = Router();

/**
 * @route POST api/order/create
 * @access PUBLIC
 * @description Fetches the entire square catalog and returns as a json string
 * Because of limitation on bigint serialization the price is converted to a string then a number
 *
 */
router.get(
  '/',
  async (req: Request, res: Response<IGetCatalogResponse | Error>) => {
    try {
      const squareResponse = await square.catalogApi.listCatalog(
        '',
        'image,item'
      );
      const allCatalogObjects: CatalogObject[] = squareResponse.result.objects;

      const imgMap: { [imageId: string]: CatalogImage } = {};
      const catalogItems: CatalogObject[] = allCatalogObjects.filter(
        (catObj) => {
          if (catObj.type === CatalogObjectTypes.IMAGE) {
            imgMap[catObj.id] = catObj.imageData;
            return false;
          }
          return true;
        }
      );
      const catalogImageMap: { [itemId: string]: CatalogImage } =
        catalogItems.reduce((map, currItem) => {
          const itemId = getItemVariationId(currItem);
          const imageId = getItemImageId(currItem);
          if (imgMap[imageId]) {
            map[itemId] = imgMap[imageId];
          }
          return map;
        }, {});

      const catalogItemsParsed = JSON.parse(JSONBig.stringify(catalogItems));
      res.json({
        catalogItems: catalogItemsParsed,
        catalogImageMap,
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export default router;
