import { APP_PORT } from './config';
import { app } from './app';

const start = async () => {
  app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`);
  });
};

start();
