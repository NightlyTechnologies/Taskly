import { Router } from 'express';

import ActivitiesController from '@modules/activities/infra/http/controllers/ActivitiesController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Segments, Joi } from 'celebrate';
import uuidValidator from '@modules/cities/infra/http/middlewares/uuidValidator';

const router = Router();

const activitiesController = new ActivitiesController();

router.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required().min(3).required(),
      description: Joi.string().required(),
      responsibles: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: ['uuidv4'] }))
        .required(),
      cities: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: ['uuidv4'] }))
        .required(),
      deadline: Joi.date().required(),
    },
  }),
  activitiesController.create,
);

router.get('/', ensureAuthenticated, activitiesController.index);

router.get(
  '/my-activities',
  ensureAuthenticated,
  activitiesController.userIndex,
);

router.post(
  '/:id',
  uuidValidator,
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().min(3),
      description: Joi.string(),
      status: Joi.string().valid('requested', 'pending', 'finished'),
      responsibles: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: ['uuidv4'] })),
      cities: Joi.array()
        .min(1)
        .items(Joi.string().guid({ version: ['uuidv4'] })),
      deadline: Joi.date(),
    },
  }),
  activitiesController.update,
);

router.delete(
  '/:id',
  uuidValidator,
  ensureAuthenticated,
  activitiesController.delete,
);

export default router;
