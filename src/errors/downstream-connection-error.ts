import { CustomError } from "./custom-error";

export class DownstreamConnectionError extends CustomError {
  reason = "Error connecting to the origin service";
  statusCode = 500
  constructor() {
    super('Error connecting to origin service');

    Object.setPrototypeOf(this, DownstreamConnectionError.prototype);
  }

  getErrorMessage() {
    return {
        message: this.reason,
      }
  }
}
