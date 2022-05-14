import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest, requireAuth } from '../middlewares';
import {
  getGoalById,
  getGoalsByOwner,
  createGoal,
  updateGoal,
  completeGoal
} from '../controllers/goalController';
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

router.post(
  '/create',
  requireAuth,
  [
    body('Name').not().isEmpty().withMessage('Name must be provided'),
    body('Steps').isArray().withMessage('Steps is invalid')
  ],
  validateRequest,
  createGoal
);

router.patch(
  '/update/:goalid',
  requireAuth,
  [
    body('Name').not().isEmpty().withMessage('Name must be provided'),
    body('Steps').isArray().withMessage('Steps is invalid'),
    param('goalid').custom(isGoalIdValid)
  ],
  validateRequest,
  updateGoal
);

router.patch(
  '/setcomplete/:goalid',
  requireAuth,
  [param('goalid').custom(isGoalIdValid)],
  validateRequest,
  completeGoal
);

export default router;
