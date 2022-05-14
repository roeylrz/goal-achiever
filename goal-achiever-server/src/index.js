import mongoose from 'mongoose';
import { APP_PORT, MONGO_URI, MONGO_OPTIONS } from './config';
import { app } from './app';

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    console.log('Connected to MongoDb');
  } catch (err) {
    throw new Error('Cannot connect to db');
  }

  app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`);
  });
};

start();
