import { Request, Response } from "express";
import { createPostDto } from "../../dto/post.dto";
import { UserStatus } from "../../dto/user.dto";
import userService from "../user/user.service";
import postService from "./post.service";

const getPosts = async (req: Request, res: Response) => {
  const result = await postService.getPosts();
  res.send(result);
};

const getPost = async (req: Request, res: Response) => {
  const result = await postService.getPost(req.params.id);
  if (result) res.send(result);
  else
    res.status(404).send({
      status: 404,
      message: "that post id was not found",
    });
};

const createPost = async (req: Request, res: Response) => {
  const post: createPostDto = req.body;
  const result = await postService.createPost(post);
  if (result) res.send(result);
  else
    res.send(500).send({
      status: 500,
      message: "something wrong in server while creating post",
    });
};

const updatePost = async (req: Request, res: Response) => {
  const result = await postService.updatePost(req.params.id, req.body);
  if (result) res.send(result);
  else
    res.status(404).send({
      status: 404,
      message: "that post id was not found",
    });
};

const deletePost = async (req: Request, res: Response) => {
  const result = await postService.deletePost(req.params.id);
  if (result) res.send(result);
  else
    res.status(404).send({
      status: 404,
      message: "that post id was not found",
    });
};

const addUsers = async (req: Request, res: Response) => {
  const users = req.body.users;
  const targetPostId = req.params.id;
  const targetPost = await postService.getPost(targetPostId);

  if(users.length + targetPost.users.length > targetPost.partySize) res.status(400).send({
    status: 400,
    message: "number of users to add exceeds max party size"
  });

  else{
    for(const userId of users){
      await userService.linkUserToPost(userId, targetPostId, UserStatus.MEMBER);
    }
  }
}

const inviteUsers = async (req: Request, res: Response) => {
  const users = req.body.users;
  const targetPostId = req.params.id;
  
  const result = [];
  for(const userId of users){
    result.push({
      userId: userId,
      result: await userService.linkUserToPost(userId, targetPostId, UserStatus.PENDING)
    });
  }

  res.send(result);
}

const postController = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addUsers,
  inviteUsers,
};

export default postController;
