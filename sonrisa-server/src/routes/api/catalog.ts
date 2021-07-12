import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import JSONBig from 'json-bigint';
import { CatalogObject } from 'square';
import { catalogConstants } from '../../core/catalog/catalog-constants';
import { getItemImageId, getItemVariationId } from '../../core/utils';
import { catalogImages } from '../../data/catalog-images';
import { square } from '../../square';

interface IGetCatalogResponse {
  mainCatalogItems: CatalogObject[];

  specialsCatalogItems: CatalogObject[];

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
      const _specialsItems: CatalogObject[] = [];
      const _mainMenuItems: CatalogObject[] = _allCatalogObjects.filter(
        (catalogObject) => {
          // if its a catalog item add it to the array
          if (catalogObject.type === CatalogObjectTypes.ITEM) {
            if (
              catalogObject.itemData.categoryId ===
              catalogConstants[process.env.NODE_ENV].SPECIALS_CATEGORY_ID
            ) {
              _specialsItems.push(catalogObject);
              return false;
            }
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
      _mainMenuItems.forEach((item) => {
        const _itemId = getItemVariationId(item);
        const _imageId = getItemImageId(item);
        const _images = _imageMapByImageId[_imageId];

        _imageMapByItemId[_itemId] = _images;
      });

      // specials need special image
      _specialsItems.forEach((item) => {
        const _itemId = getItemVariationId(item);
        const _imageId = getItemImageId(item);
        const _images = _imageMapByImageId[_imageId];

        _imageMapByItemId[_itemId] = [
          catalogImages[process.env.NODE_ENV].SPECIAL,
          ..._images,
        ];
      });

      const _mainMenuItemsParsed = JSON.parse(
        JSONBig.stringify(_mainMenuItems)
      );
      const _specialsItemsParsed = JSON.parse(
        JSONBig.stringify(_specialsItems)
      );

      res.json({
        mainCatalogItems: _mainMenuItemsParsed,
        specialsCatalogItems: _specialsItemsParsed,
        catalogImageMap: _imageMapByItemId,
      });
    } catch (err) {
      console.error(err.message);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export default router;
