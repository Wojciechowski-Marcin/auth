import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config";
import { IUserToken } from "../types/UserToken";
import { BadRequestError, UnauthorizedError } from "../utils/errors";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new BadRequestError("Missing authorization header");
  }
  const token = auth.split(" ")[1];
  if (!token) {
    throw new BadRequestError("Incorrect token format");
  }
  const user = tryVerifyToken(token);
  res.locals.token = token;
  res.locals.user = user;
  next();
};

const tryVerifyToken = (token: string) => {
  try {
    return verify(token, SECRET_JWT_KEY) as IUserToken;
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    }
    if (e instanceof JsonWebTokenError) {
      throw new UnauthorizedError("Invalid Token");
    }
  }
};
