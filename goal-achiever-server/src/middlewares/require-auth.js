import { NotAuthorizedError } from '../shared/errors';

export const requireAuth = async (req, res, next) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
