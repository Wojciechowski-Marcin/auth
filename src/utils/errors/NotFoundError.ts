import HttpError from "./HttpError";

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export default NotFoundError;
