import { Request, Response } from "express";
import { createUserDto, UserDto } from "../../dto/user.dto";
import userService from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  res.send(await userService.getUsers());
};

const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.getUser(id);
  if (result) res.send(result);
  else
    res.status(404).send({
      status: 404,
      message: "that user id was not found",
    });
};

const createUser = async (req: Request, res: Response) => {
  const user: createUserDto = req.body;
  const result = await userService.createUser(user);
  if (result) res.send(result);
  else
    res.status(404).send({
      status: 404,
      message: "that user id was not found",
    });
};

const updateUser = async (req: Request, res: Response) => {
  const updateVal: createUserDto = req.body;
  const result = await userService.updateUser(req.params.id, updateVal);
  if (result) res.send(result);
  else
    res.status(404).send({
      status: 404,
      message: "that user id was not found",
    });
};

const deleteUser = async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.id);
  if (result) res.send(result);
  else
    res.status(404).send({
      status: 404,
      message: "that user id was not found",
    });
};

const acceptInvite = async (req: Request, res: Response) => {
  const targetId = req.params.userId;
  const targetPostId = req.params.postId;
  const result = await userService.acceptInvite(targetId, targetPostId);
  if (result.count == 0)
    res.status(400).send({
      status: 400,
      message: "pair user, post is not valid",
    });
  else {
    await userService.acceptInvite(targetId, targetPostId);
    res.send({
      userId: targetId,
      postId: targetPostId,
    });
  }
};

const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  acceptInvite,
};

export default userController;
