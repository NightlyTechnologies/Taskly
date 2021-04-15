import { Joi } from 'celebrate';

export default Joi.string()
  .pattern(/^[0-9]*$/)
  .length(11);
