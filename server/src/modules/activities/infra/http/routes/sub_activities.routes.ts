import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Segments, Joi } from 'celebrate';
import uuidValidator from '@modules/cities/infra/http/middlewares/uuidValidator';
import Sub_ActivitiesController from '@modules/activities/infra/http/controllers/Sub_ActivitiesController';

const router = Router();

const sub_activitiesController = new Sub_ActivitiesController();

router.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required().min(3).required(),
      description: Joi.string().required(),
      deadline: Joi.date().required(),
      activity: Joi.string()
        .guid({ version: ['uuidv4'] })
        .required(),
      responsibles: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: ['uuidv4'] }))
        .required(),
    },
  }),
  sub_activitiesController.create,
);

router.delete(
  '/:id',
  uuidValidator,
  ensureAuthenticated,
  sub_activitiesController.delete,
);

router.put(
  '/:id',
  uuidValidator,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().min(3),
      description: Joi.string(),
      deadline: Joi.date(),
      responsibles: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: ['uuidv4'] })),
      status: Joi.string().valid('requested', 'pending', 'finished'),
    },
  }),
  ensureAuthenticated,
  sub_activitiesController.update,
);

export default router;
