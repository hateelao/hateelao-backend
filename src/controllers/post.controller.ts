import { randomInt } from "crypto";
import { Application, Request, Response } from "express";
import { PostDto } from "../dto/post.dto";
import userController from "./user.controller";

const posts: PostDto[] = [];

function findPostById(id: number) {
  return posts.findIndex((item, index, arr) => {
    if (item.postId === id) return true;
  });
}

const getPosts = async (req: Request, res: Response) => {
  res.send(posts);
};

const getPost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id == NaN)
    res.status(400).send({
      status: 400,
      message: "this ain't number bih",
    });

  const resultInd = findPostById(id);

  if (resultInd == -1)
    res.status(404).send({
      status: 404,
      message: "that id was not found",
    });

  res.send(posts[resultInd]);
};

const createPost = async (req: Request, res: Response) => {
  const post: PostDto = req.body;

  if(!post.postId) post.postId = randomInt(Math.pow(2,31));
  if(!post.title) post.title = "";
  if(!post.partySize) post.partySize = 5;
  if(!post.users) post.users = [];
  if(!post.pendingUsers) post.pendingUsers = [];

  posts.push(post);
  res.send(post);
};

const updatePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const postToUpdateInd = findPostById(id);

  if (postToUpdateInd == -1) {
    res.status(400).send({
      status: 400,
      message: "that post id was not found",
    });

    return;
  }

  if (req.body.title) posts[postToUpdateInd].title = req.body.title;
  if (req.body.partySize) posts[postToUpdateInd].partySize = req.body.partySize;

  res.send(posts[postToUpdateInd]);
};

const addUser = async (req: Request, res: Response) => {
  const userToAdd = await userController.findUserById(req.body.id);

  const targetPostId = parseInt(req.params.id);
  if (targetPostId == NaN)
    res.status(400).send({
      status: 400,
      message: "this ain't number bih",
    });

  const targetPostInd = findPostById(targetPostId);

  if (posts[targetPostInd].users.length < posts[targetPostInd].partySize) {
    if (userToAdd) {
      posts[targetPostInd].users.push(userToAdd);
      res.send(userToAdd);
    } else {
      res.status(400).send({
        status: 400,
        message: "that user id was not found",
      });
    }
  } else {
    res.status(400).send({
      status: 400,
      message: "party is full",
    });
  }
};

const removeUser = async (req: Request, res: Response) => {
  const targetPostId = parseInt(req.params.id);
  const targetPostInd = findPostById(targetPostId);
  const userId = parseInt(req.body.id);
  const userInd = await userController.findUserInList(
    posts[targetPostInd].users,
    userId
  );
  if (userInd == -1)
    res.status(400).send({
      status: 400,
      message: "that user id was not found",
    });
  else res.send(posts[targetPostInd].users.splice(userInd));
};

const addPendingUser = async (req: Request, res: Response) => {
  const userToAdd = await userController.findUserById(req.body.id);
  const targetPostId = parseInt(req.params.id);
  if (targetPostId == NaN)
    res.status(400).send({
      status: 400,
      message: "this ain't number bih",
    });

  const targetPostInd = findPostById(targetPostId);

  if (userToAdd) {
    posts[targetPostInd].users.push(userToAdd);
    res.send(userToAdd);
  } else
    res.status(400).send({
      status: 400,
      message: "that user id was not found",
    });
};

const removePendingUser = async (req: Request, res: Response) => {
  const targetPostId = parseInt(req.params.id);
  const targetPostInd = findPostById(targetPostId);
  const userId = parseInt(req.body.id);
  const userInd = await userController.findUserInList(
    posts[targetPostInd].pendingUsers,
    userId
  );
  if (userInd == -1)
    res.status(400).send({
      status: 400,
      message: "that user id was not found",
    });
  else res.send(posts[targetPostInd].pendingUsers.splice(userInd));
};

const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id == NaN)
    res.status(400).send({
      status: 400,
      message: "this ain't number bih",
    });

  const postToDeleteInd = findPostById(id);
  if (postToDeleteInd === -1)
    res.status(400).send({
      status: 400,
      message: "that post id was not found",
    });

  res.send({ result: "success", deleted: posts.splice(postToDeleteInd) });
};

const postController = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  addUser,
  removeUser,
  addPendingUser,
  removePendingUser,
  deletePost,
};

export default postController;
