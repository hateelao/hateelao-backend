import { randomInt } from "crypto";
import e from "express";
import { Request, Response } from "express";
import { LobbyDto } from "../dto/lobby.dto";
import { MessageDto } from "../dto/message.dto";
import { UserStatus } from "../dto/user.dto";

const lobbies: LobbyDto[] = [];

const findLobbyById = async (lobbies: LobbyDto[], id: any) => {
  return lobbies.findIndex((item, index, arr) => {
    if (item.post.postId == id) return true;
  });
};

const getLobbies = async (req: Request, res: Response) => {
  res.send(lobbies);
};

const getLobby = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const lobbyInd = await findLobbyById(lobbies, postId);
  if (lobbyInd === -1)
    res.status(404).send({
      status: 404,
      message: "lobby id not found",
    });
  else res.send(lobbies[lobbyInd]);
};

const createLobby = async (req: Request, res: Response) => {
  const lobby: LobbyDto = req.body;
  if (!lobby.post.postId) lobby.post.postId = randomInt(Math.pow(2, 31));
  if (!lobby.post) {
    res.status(400).send({
      status: 400,
      message: "lobby must specify 'post'",
    });
    return;
  }
  if (!lobby.chat) lobby.chat = [];
  if (!lobby.status) lobby.status = UserStatus.MEMBER;

  lobbies.push(lobby);
  res.send(lobby);
};

const updateLobby = async (req: Request, res: Response) => {
  const status: UserStatus = req.body.status;
  const message: MessageDto = req.body.message;
  const lobbyInd = await findLobbyById(lobbies, req.params.id);
  if (lobbyInd != -1) {
    if (status) lobbies[lobbyInd].status = status;
    else
      res.status(400).send({
        status: 400,
        message: "invalid status input (must be boolean)",
      });
  }
  if (message) {
    message.date = new Date();
    lobbies[lobbyInd].chat.push(message);
  }
  if (status) {
    lobbies[lobbyInd].status = status;
  }

  res.send(lobbies[lobbyInd]);
};

const addMessages = async (req: Request, res: Response) => {
  const lobbyInd = await findLobbyById(lobbies, req.params.id);
  if (lobbyInd === -1) {
    res.status(404).send({
      status: 404,
      message: "lobby id was not found",
    });
  } else {
    const message: MessageDto = req.body;
    message.date = new Date();
    lobbies[lobbyInd].chat.push(message);
  }
};

const deleteLobby = async (req: Request, res: Response) => {
  const lobbyInd = await findLobbyById(lobbies, req.params.id);
  if (lobbyInd === -1) {
    res.status(404).send({
      status: 404,
      message: "lobby id was not found",
    });
  } else {
    res.send(lobbies.splice(lobbyInd));
  }
};

const lobbyController = {
  getLobbies,
  getLobby,
  createLobby,
  updateLobby,
  addMessages,
  deleteLobby,
  findLobbyById,
};

export default lobbyController;
