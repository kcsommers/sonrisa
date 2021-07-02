import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { CatalogObject } from 'square';
import { catalogImages } from '../../data/catalog-images';
import { square } from '../../square';
import JSONBig from 'json-bigint';
import { getItemImageId, getItemVariationId } from '../../core/utils';

interface IGetCatalogResponse {
  catalogItems: CatalogObject[];

  catalogImageMap: { [imageId: string]: string[] };
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
      const _res = await square.catalogApi.listCatalog('', 'image,item');
      const _allCatalogObjects = _res.result.objects;

      const _imageMapByImageId: { [imageId: string]: string[] } = {};
      const _imageMapByItemId: { [itemId: string]: string[] } = {};
      const _items = <CatalogObject[]>_allCatalogObjects.filter(
        (catalogObject) => {
          // if its a catalog item add it to the array
          if (catalogObject.type === CatalogObjectTypes.ITEM) {
            return true;
          }

          // if its an image filter it out and store the url
          if (catalogObject.type === CatalogObjectTypes.IMAGE) {
            const _allImages =
              catalogImages[process.env.NODE_ENV][catalogObject.id] || [];

            _imageMapByImageId[catalogObject.id] = [
              catalogObject.imageData?.url as string,
              ..._allImages,
            ];
            return false;
          }

          return false;
        }
      );

      // create image map based on item id
      _items.forEach((item) => {
        const _itemId = getItemVariationId(item);
        const _imageId = getItemImageId(item);
        const _images = _imageMapByImageId[_imageId];

        _imageMapByItemId[_itemId] = _images;
      });

      const _itemsParsed = JSON.parse(JSONBig.stringify(_items));

      res.json({
        catalogItems: _itemsParsed,
        catalogImageMap: _imageMapByItemId,
      });
    } catch (err) {
      console.error(err.message);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export default router;
