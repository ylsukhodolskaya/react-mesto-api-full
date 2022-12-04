import { constants } from 'http2';

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}
