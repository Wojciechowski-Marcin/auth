import { NextFunction, Request, Response } from "express";
import HttpError from "../utils/errors/HttpError";

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Internal server Error";

  res.status(status).json({
    isSuccess: false,
    error: message,
  });
};

export default errorHandler;
