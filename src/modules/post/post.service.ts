import { createPostDto } from "../../dto/post.dto";
import { UserStatus } from "../../dto/user.dto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPosts = async () => {
  return await prisma.post.findMany();
};

const getPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      postId: id,
    },
  });
};

const createPost = async (post: createPostDto) => {
  return await prisma.UserWithStatus.create({
    data: {
      user: {
        connect: {
          userId: post.ownerId,
        },
      },
      status: UserStatus.OWNER,
      Post: {
        create: {
          title: post.title,
          partySize: post.partySize,
        },
      },
    },
  });
};

const updatePost = async (targetId: string, val: createPostDto) => {
  return await prisma.post.update({
    where: {
      postId: targetId,
    },
    data: {
      title: val.title,
      partySize: val.partySize,
    },
  });
};

const deletePost = async (targetId: string) => {
  return await prisma.post.delete({
    where: {
      postId: targetId,
    },
  });
};

const addUser = async (user: string) => {};

const postService = {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  createPost,
};

export default postService;
