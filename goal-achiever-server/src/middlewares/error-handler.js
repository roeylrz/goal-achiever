import { HttpError } from '../shared/errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    const errors = err.serializeErrors();
    if (!req.error) {
      req.error = errors.map((error) => JSON.stringify(error)).join();
    }
    return res.status(err.statusCode).send({ errors });
  }
  req.error = err.message;
  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong'
      }
    ]
  });
};
