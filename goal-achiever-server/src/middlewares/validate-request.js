import { validationResult } from 'express-validator';
import { RequestValidationError } from '../shared/errors';

export const validateRequest = (req, res, next) => {
  const validationRejects = validationResult(req);

  if (!validationRejects.isEmpty()) {
    throw new RequestValidationError(validationRejects.array());
  }

  next();
};
