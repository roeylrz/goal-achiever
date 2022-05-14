import jwt from 'jsonwebtoken';
import { jwt_secret, jwt_expire_within } from '../config';

export const createWebToket = (payload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: jwt_expire_within });
};

export const validateToken = (accessToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, jwt_secret, function (err, decodedPayload) {
      if (err) {
        return reject(err);
      }
      const payload = {
        ...decodedPayload,
        token: accessToken
      };
      resolve(payload);
    });
  });
};
