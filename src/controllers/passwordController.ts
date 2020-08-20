import { Request, Response } from "express";

class PasswordController {
  reset = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
  };

  change = (req: Request, res: Response) => {
    res.send("NOT IMPLEMENTED");
  };
}

export default new PasswordController();
