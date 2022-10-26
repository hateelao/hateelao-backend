import { Router } from "express";
import lobbyController from "../modules/lobby/lobby.controller";

export const lobbyRouter = Router();

lobbyRouter.get("/:id", lobbyController.getLobby);
lobbyRouter.patch("/:postId", lobbyController.addMessage);
