import { validateToken } from '../authentication';

export const currentUser = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    if (!req.headers.authorization) {
      return next();
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next();
    }
    req.currentUser = await validateToken(token);
  } catch (err) {
    console.log('ERROR', err);
  }
  next();
};
