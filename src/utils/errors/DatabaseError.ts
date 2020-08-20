import HttpError from "./HttpError";

class DatabaseError extends HttpError {
  constructor(reason: any) {
    let status = 500;
    let message = "";

    if (reason.name === "CastError") {
      status = 400;
      message = "Invalid field format";
    } else if (reason.code === 11000) {
      status = 409;
      message = "Duplicate field error";
    } else if (reason.name === "ValidationError") {
      status = 400;
      message = "Field validation error";
    }

    super(status, message);
  }
}

export default DatabaseError;
