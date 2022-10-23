import { Router } from "express";
import exploreController from "../modules/explore/explore.controller";

// => /users
export const exploreRouter = Router();

exploreRouter.get("/", exploreController.getExplore);
