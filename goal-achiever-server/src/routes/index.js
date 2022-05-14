import UserRoute from './userRoute';
import GoalRoute from './goalRoute';

export default (app) => {
  app.use('/users', UserRoute);
  app.use('/goals', GoalRoute);
};
