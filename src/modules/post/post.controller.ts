import { Request, Response } from "express";
import { createPostDto } from "../../dto/post.dto";
import postService from "./post.service";

const getPosts = async (req: Request, res: Response) => {
  const posts = await postService.getPosts();
  const result = posts.map((post: any) => postService.parsePost(post));
  res.send(result);
};

const getPost = async (req: Request, res: Response) => {
  const result = await postService.getPost(req.params.id);
  if (result) res.send(postService.parsePost(result));
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
  const usersFirebaseId = req.body.users;
  const targetPostId = req.params.id;
  const targetPost = await postService.getPost(targetPostId);

  if (usersFirebaseId.length + targetPost.users.length > targetPost.partySize)
    res.status(400).send({
      status: 400,
      message: "number of users to add exceeds max party size",
    });
  else {
    const results: any[] = [];
    for (const userFirebaseId of usersFirebaseId) {
      results.push(await postService.addUser(userFirebaseId, targetPostId));
    }
    res.send(results);
  }
};

const inviteUsers = async (req: Request, res: Response) => {
  const users = req.body.users;
  const targetPostId = req.params.id;

  const result = [];
  for (const userFirebaseId of users) {
    result.push({
      userFirebaseId: userFirebaseId,
      result: await postService.inviteUser(userFirebaseId, targetPostId),
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
