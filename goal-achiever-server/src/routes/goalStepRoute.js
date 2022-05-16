import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest, requireAuth } from '../middlewares';
import {
  createStep,
  updateStep,
  getAllNextSteps,
  completeStep
} from '../controllers/goalStepsController';
import { isGoalIdValid, isStepIdValid } from './customValidator/goalValidator';

const router = express.Router();

router.get('/nextsteps', requireAuth, getAllNextSteps);

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

router.patch(
  '/update/:stepid',
  requireAuth,
  [
    body('Name').not().isEmpty().withMessage('Name must be provided'),
    param('stepid').custom(isStepIdValid)
  ],
  validateRequest,
  updateStep
);

router.patch('/complete/:stepid', requireAuth, completeStep);

export default router;
