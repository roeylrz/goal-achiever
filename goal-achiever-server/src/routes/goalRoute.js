import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest, requireAuth } from '../middlewares';
import { getGoalById, getGoalsByOwner } from '../controllers/goalController';
import { isGoalIdValid } from './customValidator/goalValidator';

const router = express.Router();

router.get('/', requireAuth, getGoalsByOwner);

router.get(
  '/:goalid',
  requireAuth,
  [param('goalid').custom(isGoalIdValid)],
  validateRequest,
  getGoalById
);

export default router;
