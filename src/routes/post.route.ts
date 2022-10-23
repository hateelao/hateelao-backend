import { Router } from "express";
import express, { Application, Request, Response } from "express";
import postController from "../modules/post/post.controller";

// => /users
export const postRouter = Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);
postRouter.post("/", postController.createPost);
postRouter.patch("/:id", postController.updatePost);
postRouter.patch("/:id/users/add", postController.addUsers);
postRouter.patch("/:id/users/invite", postController.inviteUsers);
postRouter.delete("/:id", postController.deletePost);
