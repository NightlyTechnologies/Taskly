import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import CitiesController from '@modules/cities/infra/http/controllers/CitiesController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uuidValidator from '@modules/cities/infra/http/middlewares/uuidValidator';

import {
  agreement,
  mayor,
  mayorUpdate,
  tax_responsible,
  tax_responsibleUpdate,
  supervisor,
  supervisorUpdate,
  vtn,
  vtnUpdate,
  tasks,
} from '@modules/cities/infra/http/validators';

const router = Router();

const citiesController = new CitiesController();

router.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      avatar_url: Joi.string().required(),
      name: Joi.string().required(),
      uf: Joi.string().required().length(2),
      begin_validity: Joi.date(),
      final_validity: Joi.date(),
      contract_type: Joi.string().valid('online', 'presential'),
      contract_value: Joi.number().precision(2),
      agreement,
      mayor: Joi.object(mayor).required(),
      tax_responsible,
      supervisor1: supervisor,
      supervisor2: supervisor,
      vtn1: Joi.object(vtn).required(),
      vtn2: Joi.object(vtn).required(),
      vtn3: Joi.object(vtn).required(),
      vtn4: Joi.object(vtn).required(),
      vtn5: Joi.object(vtn).required(),
      tasks,
    },
  }),
  citiesController.create,
);

router.get('/', ensureAuthenticated, citiesController.index);

router.get('/:id', uuidValidator, ensureAuthenticated, citiesController.show);

router.put(
  '/:id',
  uuidValidator,
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      avatar_url: Joi.string(),
      name: Joi.string(),
      uf: Joi.string().length(2),
      begin_validity: Joi.date(),
      final_validity: Joi.date(),
      contract_type: Joi.string().valid('online', 'presential'),
      contract_value: Joi.number().precision(2),
      agreement,
      mayor: mayorUpdate,
      tax_responsible: tax_responsibleUpdate,
      supervisor1: supervisorUpdate,
      supervisor2: supervisorUpdate,
      vtn1: vtnUpdate,
      vtn2: vtnUpdate,
      vtn3: vtnUpdate,
      vtn4: vtnUpdate,
      vtn5: vtnUpdate,
      tasks,
    },
  }),
  citiesController.update,
);

export default router;
