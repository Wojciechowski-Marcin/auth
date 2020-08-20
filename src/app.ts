import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routers/authRouter";
import passwordRouter from "./routers/passwordRouter";
import userRouter from "./routers/userRouter";
import { setUpDatabase } from "./utils/databaseHelpers";

const app = express();
app.use(bodyParser.json());

setUpDatabase();

app.get("", (req: Request, res: Response) => res.sendStatus(200));

app.use("/auth", authRouter);
app.use("/password", passwordRouter);
app.use("/user", userRouter);

app.use(errorHandler);

export default app;
