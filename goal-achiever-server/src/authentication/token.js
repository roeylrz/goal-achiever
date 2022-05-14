import jwt from 'jsonwebtoken';
import { jwt_secret, jwt_expire_within } from '../config';

export const createWebToket = (payload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: jwt_expire_within });
};
