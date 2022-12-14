import { Router } from "express";
import userController from "../modules/user/user.controller";

// => /users
export const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.patch(
  "/:userFirebaseId/accept/:postId",
  userController.acceptInvite
);
