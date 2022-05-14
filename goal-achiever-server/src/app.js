import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import { addCors } from './middlewares';
import addRoutes from './routes';

const app = express();
app.use(bodyParser.json());
addCors(app);
addRoutes(app);

export { app };
