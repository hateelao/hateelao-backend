import { Request, Response } from "express";
import { stringify } from "querystring";
import lobbyService from "./lobby.service";

const getLobby = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userFirebaseId: string = req.params.userFirebaseId;
  res.send(await lobbyService.getLobby(userFirebaseId, postId));
};

const addMessage = async (req: Request, res: Response) => {
  const authorFirebaseId = req.body.authorFirebaseId;
  const postId = req.params.postId;
  const content = req.body.content;
  res.send(await lobbyService.addMessage(authorFirebaseId, postId, content));
};

const lobbyController = {
  getLobby,
  addMessage,
};

export default lobbyController;
