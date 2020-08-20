import { Router } from "express";

import passwordController from "../controllers/passwordController";

const passwordRouter = Router();

passwordRouter.post("/reset", passwordController.reset);
passwordRouter.post("/change", passwordController.change);

export default passwordRouter;
