import { errorHandler, currentUser } from '../middlewares';
import { NotFoundError } from '../shared/errors';
import UserRoute from './userRoute';
import GoalRoute from './goalRoute';
import GoalStepRoute from './goalStepRoute';

export default (app) => {
  app.use(currentUser);
  app.use('/users', UserRoute);
  app.use('/goals', GoalRoute);
  app.use('/goalSteps', GoalStepRoute);
  app.all('*', async () => {
    throw new NotFoundError();
  });
  app.use(errorHandler);
};
