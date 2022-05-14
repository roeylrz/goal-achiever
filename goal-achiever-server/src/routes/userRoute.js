import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares';
import { signup, login } from '../controllers/userController';

const router = express.Router();

router.post(
  '/signup',
  [
    body('FirstName').not().isEmpty().withMessage('FirstName must be provided'),
    body('UserName').not().isEmpty().withMessage('UserName must be provided'),
    body('Password').not().isEmpty().withMessage('Password must be provided')
  ],
  validateRequest,
  signup
);

router.post(
  '/login',
  [
    body('UserName').not().isEmpty().withMessage('UserName must be provided'),
    body('Password').not().isEmpty().withMessage('Password must be provided')
  ],
  validateRequest,
  login
);

export default router;
