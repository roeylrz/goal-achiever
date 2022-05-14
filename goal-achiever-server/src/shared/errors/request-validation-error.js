import { HttpError } from './http-error';

export class RequestValidationError extends HttpError {
  constructor(errors) {
    super(400, 'Invalid request parameters');
    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
