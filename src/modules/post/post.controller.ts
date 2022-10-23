import { Request, Response } from "express";
import { updateNamespaceExportDeclaration } from "typescript";
import { createPostDto, PostDto } from "../../dto/post.dto";
import { UserStatus } from "../../dto/user.dto";
import userService from "../user/user.service";
import postService from "./post.service";

function parsePost(post: any) {
  const result: PostDto = {
    postId: post.postId,
    title: post.title,
    partySize: post.partySize,
    users: [],
    pendingUsers: [],
    owner: {
      userId: "",
      displayName: "",
      photoURL: "",
      firebaseId: "",
    },
  };
  for (const user of post.users) {
    if (user.status == UserStatus.MEMBER) result.users.push(user.user);
    else if (user.status == UserStatus.PENDING) result.users.push(user.user);
    else if (user.status == UserStatus.OWNER) result.owner = user.user;
  }
  return result;
}

const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  const result = posts.map((post: any) => parsePost(post));
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

  if (users.length + targetPost.users.length > targetPost.partySize)
    res.status(400).send({
      status: 400,
      message: "number of users to add exceeds max party size",
    });
  else {
    const results: any[] = [];
    for (const userId of users) {
      results.push(
        await userService.linkUserToPost(
          userId,
          targetPostId,
          UserStatus.MEMBER
        )
      );
    }
    res.send(results);
  }
};

const inviteUsers = async (req: Request, res: Response) => {
  const users = req.body.users;
  const targetPostId = req.params.id;

  const result = [];
  for (const userId of users) {
    result.push({
      userId: userId,
      result: await userService.linkUserToPost(
        userId,
        targetPostId,
        UserStatus.PENDING
      ),
    });
  }

  res.send(result);
};

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
