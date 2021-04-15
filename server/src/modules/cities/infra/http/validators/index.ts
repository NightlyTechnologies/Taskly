import { Joi } from 'celebrate';

import phone from '@shared/infra/http/validators';

export const mayor = {
  name: Joi.string().required(),
  birth: Joi.date().required(),
  email: Joi.string().email().required(),
  phone,
  reelected: Joi.boolean().required(),
};

export const mayorUpdate = {
  name: Joi.string(),
  birth: Joi.date(),
  email: Joi.string().email(),
  phone,
  reelected: Joi.boolean(),
};

export const tax_responsible = {
  name: Joi.string().required(),
  birth: Joi.date().required(),
  email: Joi.string().email().required(),
  phone,
  role: Joi.string().required(),
};

export const tax_responsibleUpdate = {
  name: Joi.string(),
  birth: Joi.date(),
  email: Joi.string().email(),
  phone,
  role: Joi.string(),
};

export const agreement = Joi.string().valid(
  'ok',
  'nonexistent',
  'denounced',
  'unable_worker',
  'unpublished',
);

export const supervisor = {
  name: Joi.string().required(),
  qualification: Joi.date().required(),
  email: Joi.string().email().required(),
  phone,
  role: Joi.string().required(),
};

export const supervisorUpdate = {
  name: Joi.string(),
  qualification: Joi.date(),
  email: Joi.string().email(),
  phone,
  role: Joi.string(),
};

export const vtn = {
  year: Joi.number().integer().required(),
  good: Joi.number().precision(2).required(),
  regular: Joi.number().precision(2).required(),
  restricted: Joi.number().precision(2).required(),
  planted: Joi.number().precision(2).required(),
  natural: Joi.number().precision(2).required(),
  preservation: Joi.number().precision(2).required(),
};

export const vtnUpdate = {
  year: Joi.number().integer(),
  good: Joi.number().precision(2),
  regular: Joi.number().precision(2),
  restricted: Joi.number().precision(2),
  planted: Joi.number().precision(2),
  natural: Joi.number().precision(2),
  preservation: Joi.number().precision(2),
};

export const tasks = {
  audit1: Joi.boolean(),
  audit2: Joi.boolean(),
  audit3: Joi.boolean(),
  audit4: Joi.boolean(),
  audit5: Joi.boolean(),
  cafirs: Joi.boolean(),
  diffs: Joi.boolean(),
};
