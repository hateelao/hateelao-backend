import { Router } from "express";
import express, { Application, Request, Response } from "express";
import lobbyController from "../modules/lobby/lobby.controller";

// => /users
export const lobbyRouter = Router();

// lobbyRouter.get("/", lobbyController.getLobbies);
// lobbyRouter.get("/:id", lobbyController.getLobby);
// lobbyRouter.post("/", lobbyController.createLobby);
// lobbyRouter.patch("/:id", lobbyController.updateLobby);
// lobbyRouter.patch("/:id", lobbyController.addMessages);
// lobbyRouter.delete("/:id", lobbyController.deleteLobby);
