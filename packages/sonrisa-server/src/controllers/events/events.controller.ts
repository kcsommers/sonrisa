import { IPickupEvent } from '@sonrisa/core/dist/bundles';
import { Request, Response, Router } from 'express';
import { Document } from 'mongoose';
import { PickupEventModel } from '../../database';
import HttpStatusCodes from 'http-status-codes';

const router = Router();

router.get(
  '/',
  async (req: Request, res: Response<Document<IPickupEvent>[]>) => {
    try {
      const { upcomingOnly } = req.query;
      const events: Document<IPickupEvent>[] = await PickupEventModel.find();
      console.log('Successfully retrieved events from DB');
      res.status(HttpStatusCodes.OK).json(events);
    } catch (_error: any) {
      console.error('Error getting events from DB', _error);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

router.post(
  '/create',
  async (
    req: Request<any, any, IPickupEvent>,
    res: Response<Document<IPickupEvent>>
  ) => {
    try {
      const pickupEvent: IPickupEvent = req.body;
      const newPickupEvent: Document<any, any, IPickupEvent> =
        await PickupEventModel.create(pickupEvent);
      console.log(`Successfully created pickup event: ${newPickupEvent._id}`);
      res.status(HttpStatusCodes.OK).json(newPickupEvent);
    } catch (_error: any) {
      console.error(_error);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

router.post(
  '/update',
  async (
    req: Request<any, any, Partial<IPickupEvent>>,
    res: Response<Document<IPickupEvent>>
  ) => {
    try {
      const newPickupEventData: Partial<IPickupEvent> = req.body;
      const updatedPickupEvent: Document<any, any, IPickupEvent> =
        await PickupEventModel.findOneAndUpdate({
          _id: newPickupEventData._id,
          newPickupEventData,
        });
      console.log(
        `Successfully updated pickup event: ${updatedPickupEvent._id}`
      );
      res.status(HttpStatusCodes.OK).json(updatedPickupEvent);
    } catch (_error: any) {
      console.error(_error);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const eventsController = router;
