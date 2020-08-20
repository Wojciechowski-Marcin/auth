import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config";
import UserModel from "../models/UserModel";
import { BadRequestError, DatabaseError, NotFoundError } from "../utils/errors";

class UserController {
  get = (req: Request, res: Response, next: NextFunction) => {
    UserModel.findById(req.params.userId, "username email")
      .then((user) => {
        if (!user) next(new NotFoundError("User does not exist"));
        else {
          res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
          });
        }
      })
      .catch((reason) => next(new DatabaseError(reason)));
  };

  post = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username || !req.body.password)
      throw new BadRequestError("Missing params username and/or password");
    UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        const token = sign(
          {
            id: user._id,
            username: user.username,
            email: user.email || "",
          },
          SECRET_JWT_KEY,
          { expiresIn: "3d" },
        );
        res.status(200).json({ isSuccess: true, token });
      })
      .catch((reason) => next(new DatabaseError(reason)));
  };

  put = (req: Request, res: Response) => {
    res.json("NOT IMPLEMENTED");
  };

  patch = (req: Request, res: Response) => {
    res.json("NOT IMPLEMENTED");
  };
}

export default new UserController();
