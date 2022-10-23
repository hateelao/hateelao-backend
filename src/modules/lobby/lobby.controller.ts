import { Request, Response } from "express";
import { stringify } from "querystring";
import lobbyService from "./lobby.service";

const getLobby = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userId: string = req.body.userId;
  res.send(await lobbyService.getLobby(userId, postId));
};

const addMessage = async (req: Request, res: Response) => {
  const authorId = req.body.authorId;
  const postId = req.params.postId;
  const content = req.body.content;
  res.send(await lobbyService.addMessage(authorId, postId, content));
};

const lobbyController = {
  getLobby,
  addMessage,
};

export default lobbyController;
