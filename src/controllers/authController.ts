import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config";
import UserModel, { IUser } from "../models/UserModel";
import {
  BadRequestError,
  DatabaseError,
  UnauthorizedError,
} from "../utils/errors";

class AuthController {
  login = (req: Request, res: Response, next: NextFunction) => {
    const checkParams = () => {
      if (!req.body.username || !req.body.password)
        throw new BadRequestError("Missing params username and/or password");
    };

    const findUserByUsername = (username: string) =>
      UserModel.findOne({ username })
        .then((user) => {
          if (!user) next(new UnauthorizedError());
          return user;
        })
        .catch((reason) => next(new DatabaseError(reason)));

    const comparePasswordsAndGetToken = (password: string, user: IUser) =>
      compare(password, user.password).then((result) =>
        result
          ? sign(
              {
                id: user._id,
                username: user.username,
                email: user.email || "",
              },
              SECRET_JWT_KEY,
              { expiresIn: "3d" },
            )
          : next(new UnauthorizedError()),
      );

    checkParams();
    findUserByUsername(req.body.username)
      .then(
        (user) => user && comparePasswordsAndGetToken(req.body.password, user),
      )
      .then((token) => res.json({ isSuccess: true, token }))
      .catch((error) => next(error));
  };

  logout = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
  };
}

export default new AuthController();
