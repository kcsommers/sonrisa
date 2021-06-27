import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { square } from '../../square';
import { CatalogImage, CatalogItem, CatalogObject } from 'square';

class CatalogItemTypes {
  public static ITEM = 'ITEM';

  public static IMAGE = 'IMAGE';
}

const router: Router = Router();

// SQUARE ROUTE
router.get('/', async (req: Request, res: Response<CatalogItem[] | string>) => {
  try {
    const _res = await square.catalogApi.listCatalog('', 'image,item');
    const _items = _res.result.objects;

    const _imageMap = new Map<string, string>();
    const _catalogItems: CatalogItem[] = _items
      .filter((o) => {
        if (o.type === CatalogItemTypes.IMAGE) {
          _imageMap.set(o.id, o.imageData.url);
          return false;
        }

        return true;
      })
      .map((o) => {
        return {
          ...o.itemData,
          imageUrl: '',
        };
      });

    res.json(_catalogItems);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
  }
});

export default router;
