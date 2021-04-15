import { Request, Response, NextFunction } from 'express';

import { validate } from 'uuid';

import AppError from '@shared/errors/AppError';

function uuidValidator(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params;

  const validId = validate(id);

  if (!validId) {
    throw new AppError('Invalid Id format');
  }

  return next();
}

export default uuidValidator;
