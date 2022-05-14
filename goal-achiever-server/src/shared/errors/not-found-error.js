import { HttpError } from './http-error';
export class NotFoundError extends HttpError {
  constructor() {
    super(404, 'Route not found');
  }
}
