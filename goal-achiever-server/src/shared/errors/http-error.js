export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
