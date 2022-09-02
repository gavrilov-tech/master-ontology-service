import { HTTP_CODES } from '../constants';

export class AppError {
  constructor(
    public readonly status: HTTP_CODES,
    public readonly statusText: string,
    public readonly message?: string
  ) {
    this.status = status;
    this.statusText = statusText;
    this.message = message || statusText;
  }
}
