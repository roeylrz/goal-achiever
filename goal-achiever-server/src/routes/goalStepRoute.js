import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest, requireAuth } from '../middlewares';
import { createStep } from '../controllers/goalStepsController';
import { isGoalIdValid } from './customValidator/goalValidator';

const router = express.Router();

router.put(
  '/create',
  requireAuth,
  [
    body('Name').not().isEmpty().withMessage('Name must be provided'),
    body('GoalId').custom(isGoalIdValid)
  ],
  validateRequest,
  createStep
);

export default router;
