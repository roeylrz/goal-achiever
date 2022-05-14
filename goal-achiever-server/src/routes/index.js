import { errorHandler, currentUser } from '../middlewares';
import UserRoute from './userRoute';
import GoalRoute from './goalRoute';

export default (app) => {
  app.use(currentUser);
  app.use('/users', UserRoute);
  app.use('/goals', GoalRoute);
  app.use(errorHandler);
};
