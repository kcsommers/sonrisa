import {
  CatalogObjectTypes,
  ICatalog,
  ICatalogCategoryMap,
} from '@sonrisa/core';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import JSONBig from 'json-bigint';
import { CatalogCategory, CatalogImage, CatalogObject } from 'square';
import { square } from '../../square';
import {
  getItemCategoryId,
  getItemImageId,
  getItemVariationId,
} from '../../utils';

const router: Router = Router();

/**
 * @route POST api/order/create
 * @access PUBLIC
 * @description Fetches the entire square catalog and returns as a json string
 * Because of limitation on bigint serialization the price is converted to a string then a number
 *
 */
router.get('/', async (req: Request, res: Response<ICatalog | Error>) => {
  try {
    const squareResponse = await square.catalogApi.listCatalog(
      '',
      'image,item,category'
    );
    const allCatalogObjects: CatalogObject[] = squareResponse.result.objects;
    const imgMap: { [imageId: string]: CatalogImage } = {};
    const catalogCategoryMap: ICatalogCategoryMap = {};
    const catalogItems: CatalogObject[] = allCatalogObjects.filter((catObj) => {
      if (catObj.type === CatalogObjectTypes.IMAGE) {
        imgMap[catObj.id] = catObj.imageData;
        return false;
      }
      if (catObj.type === CatalogObjectTypes.CATEGORY) {
        catalogCategoryMap[catObj.id] = {
          category: catObj.categoryData,
          catalogObjects: [],
        };
        return false;
      }
      return true;
    });

    catalogItems.forEach((item) => {
      const imageId = getItemImageId(item);
      const categoryId = getItemCategoryId(item);
      if (!catalogCategoryMap[categoryId]) {
        return;
      }
      catalogCategoryMap[categoryId].catalogObjects.push({
        item,
        image: imgMap[imageId],
      });
    });

    res.json({
      catalogObjects: JSON.parse(JSONBig.stringify(allCatalogObjects)),
      catalogCategoryMap: JSON.parse(JSONBig.stringify(catalogCategoryMap)),
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export const catalogRouter = router;
