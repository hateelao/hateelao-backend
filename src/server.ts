import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
// import { User } from "./models/user.model";
// import { MongoClient } from "mongodb";
import { lobbyRouter } from "./routes/lobby.route";
import { postRouter } from "./routes/post.route";
import { userRouter } from "./routes/user.route";
import { dashboardRouter } from "./routes/dashboard.route";

const PORT = process.env.PORT || 8000;

const app: Application = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

// app.use("/lobbies", lobbyRouter);

app.use("/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
