import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
// import { User } from "./models/user.model";
// import { MongoClient } from "mongodb";
import { lobbyRouter } from "./routes/lobby.route";
import { postRouter } from "./routes/post.route";
import { userRouter } from "./routes/user.route";

const PORT: number = 8000;

const mongoString =
  "mongodb+srv://hateelengame:hateelao@hateelao.cl0ok4h.mongodb.net/test";

mongoose
  .connect(mongoString)
  .then(() => {
    const app: Application = express();
    app.use(express.json());

    app.get("/", async (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    app.use("/users", userRouter);

    app.use("/posts", postRouter);

    app.use("/lobbies", lobbyRouter);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
