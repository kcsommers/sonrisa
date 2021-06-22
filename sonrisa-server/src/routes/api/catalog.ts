import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { IOrderableItem } from '../../interfaces/IOrderableItem';
import { square } from '../../square';

class CatalogItemTypes {
  public static ITEM = 'ITEM';

  public static IMAGE = 'IMAGE';
}

const router: Router = Router();

// SQUARE ROUTE
router.get(
  '/',
  async (req: Request, res: Response<IOrderableItem[] | string>) => {
    try {
      const _res = await square.catalogApi.listCatalog('', 'image,item');
      const _items = _res.result.objects;

      const _orderableItems = _items.reduce(
        (arr: IOrderableItem[], catelogItem) => {
          if (catelogItem.type === CatalogItemTypes.ITEM) {
            const _itemIndex = arr.findIndex(
              (i) => i.imageId === catelogItem.imageId
            );
            const _item = <IOrderableItem>(
              (_itemIndex > -1 ? arr[_itemIndex] : {})
            );

            _item.id = catelogItem.id;
            _item.name = catelogItem.itemData.name;
            _item.description = catelogItem.itemData.description;
            _item.price =
              +catelogItem.itemData.variations[0].itemVariationData.priceMoney.amount.toString();
            _item.imageId = catelogItem.imageId;

            if (_itemIndex < 0) {
              arr.push(_item);
            }
          } else if (catelogItem.type === CatalogItemTypes.IMAGE) {
            const _itemIndex = arr.findIndex(
              (i) => i.imageId === catelogItem.id
            );
            const _item = <IOrderableItem>(
              (_itemIndex > -1 ? arr[_itemIndex] : {})
            );

            _item.imageUrl = catelogItem.imageData.url;

            if (_itemIndex < 0) {
              _item.imageId = catelogItem.id;
              arr.push(_item);
            }
          }

          return arr;
        },
        []
      );

      res.json(_orderableItems);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error');
    }
  }
);

export default router;
