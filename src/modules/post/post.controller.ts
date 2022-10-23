import { Request, Response } from "express";
import { createPostDto } from "../../dto/post.dto";
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

const addUser = async (req: Request, res: Response) => {

}

const inviteUser = async (req: Request, res: Response) => {
  
}

const postController = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addUser,
  inviteUser,
};

export default postController;
