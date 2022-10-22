import { Router } from "express";
import express, { Application, Request, Response } from "express";
import postController from "../modules/post/post.controller";

// => /users
export const postRouter = Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPost);
postRouter.post("/", postController.createPost);
postRouter.patch("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);
