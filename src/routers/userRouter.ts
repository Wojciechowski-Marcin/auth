import { Router } from "express";

import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/:userId", userController.get);
userRouter.post("", userController.post);
userRouter.put("", userController.put);
userRouter.patch("", userController.patch);

export default userRouter;
