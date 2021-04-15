import { Joi } from 'celebrate';

import phone from '@shared/infra/http/validators';

export const cpf = phone;

export const rg = Joi.string()
  .pattern(/^[0-9]*$/)
  .min(7)
  .max(10);
