import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

export { app };
