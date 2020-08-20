import HttpError from "./HttpError";

class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export default UnauthorizedError;
