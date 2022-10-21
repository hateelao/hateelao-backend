import { Router } from "express";
import express, { Application, Request, Response } from "express";
import postController from "../controllers/post.controller";

// => /users
export const lobbyRouter = Router();

lobbyRouter.get("/", postController.getPosts);
lobbyRouter.get("/:id", postController.getPost);
lobbyRouter.post("/", postController.createPost);
lobbyRouter.patch("/:id", postController.updatePost);
lobbyRouter.delete("/:id", postController.deletePost);
