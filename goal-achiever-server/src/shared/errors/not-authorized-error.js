import { HttpError } from './http-error';
export class NotAuthorizedError extends HttpError {
  constructor() {
    super(401, 'Not authorized');
  }
}
