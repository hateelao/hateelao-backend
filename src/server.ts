import express, { Application, Request, Response } from "express";
import { postRouter } from "./routes/post.route";
import { userRouter } from "./routes/user.route";

const app: Application = express();

const PORT: number = 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
