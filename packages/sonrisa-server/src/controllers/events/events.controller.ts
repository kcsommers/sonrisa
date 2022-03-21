import { ILocation, IPickupEvent } from '@sonrisa/core/dist/bundles';
import { Request, Response, Router } from 'express';
import { Document } from 'mongoose';
import { LocationModel, PickupEventModel } from '../../database';
import HttpStatusCodes from 'http-status-codes';

const router = Router();

router.get(
  '/',
  async (req: Request, res: Response<Document<IPickupEvent>[]>) => {
    try {
      const { upcomingOnly } = req.query;
      const events: Document<IPickupEvent>[] =
        await PickupEventModel.find().populate('location');
      console.log('Successfully retrieved events from DB');
      res.status(HttpStatusCodes.OK).json(events);
    } catch (_error: any) {
      console.error('Error getting events from DB', _error);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

router.post('/create', async (req: Request, res: Response) => {
  try {
    const pickupEvent: IPickupEvent = req.body;
    const location: ILocation = pickupEvent.location;
    const newLocation = await new LocationModel(location).save();
    pickupEvent.location = newLocation._id as any;
    const newPickupEvent = await new PickupEventModel(pickupEvent).save();
    console.log(`Successfully created pickup event: ${newPickupEvent._id}`);
    newPickupEvent.location = newLocation;
    res.status(HttpStatusCodes.OK).json(newPickupEvent);
  } catch (_error: any) {
    console.error(_error);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.post(
  '/update',
  async (
    req: Request<any, any, Partial<IPickupEvent>>,
    res: Response<Document<IPickupEvent>>
  ) => {
    try {
      const newPickupEventData: Partial<IPickupEvent> = req.body;
      console.log('new data:::: ', newPickupEventData);
      const updatedLocation: Document<any, any, ILocation> =
        await LocationModel.findOneAndUpdate(
          {
            _id: newPickupEventData.location._id,
          },
          newPickupEventData.location || {}
        );

      const updatedPickupEvent: Document<any, any, IPickupEvent> =
        await PickupEventModel.findOneAndUpdate(
          {
            _id: newPickupEventData._id,
          },
          {
            ...newPickupEventData,
            location: updatedLocation,
          }
        );
      console.log(`Successfully updated pickup event: ${updatedPickupEvent}`);
      res.status(HttpStatusCodes.OK).json(updatedPickupEvent);
    } catch (_error: any) {
      console.error(_error);
      res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const eventId: string = req.params.id;
    await PickupEventModel.findOneAndDelete({
      _id: eventId,
    });
    console.log(`Successfully deleted pickup event: ${eventId}`);
    res.sendStatus(HttpStatusCodes.OK);
  } catch (_error: any) {
    console.error(_error);
    res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export const eventsController = router;
