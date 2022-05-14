import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { addCors } from './middlewares';

const app = express();
app.use(bodyParser.json());
addCors(app);

export { app };
