import { Request, Response } from "express";
import { LobbyDto } from "../dto/lobby.dto";

const lobbies: LobbyDto[] = [];

const findLobbyById = async (lobbies: LobbyDto[], id: number) => {
  return lobbies.findIndex((item, index, arr) => {
    if (item.lobbyId == id) return true;
  });
};

const getLobbies = async (req: Request, res: Response) => {
  res.send(lobbies);
};

const getLobby = async (req: Request, res: Response) => {
  const lobbyId = parseInt(req.params.id);
  const lobbyInd = await findLobbyById(lobbies, lobbyId);
  if (lobbyInd === -1)
    res.status(404).send({
      status: 404,
      message: "lobby id not found",
    });
  else res.send(lobbies[lobbyInd]);
};

const createLobby = async (req: Request, res: Response) => {};

const updateLobbyStatus = async (req: Request, res: Response) => {};

const addMessages = async (req: Request, res: Response) => {};

const lobbyController = {
  getLobbies,
  getLobby,
  createLobby,
  updateLobbyStatus,
  addMessages,
  findLobbyById,
};
