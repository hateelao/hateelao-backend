import { triggerAsyncId } from "async_hooks";
import { createPostDto } from "../../dto/post.dto";
import { UserDto, UserStatus } from "../../dto/user.dto";
import userService from "../user/user.service";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPosts = async () => {
  return await prisma.post.findMany({
    include: {
      users: {
        include: {
          user: true,
        }
      },
    },
  });
};

const getPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      postId: id,
    },
    include: {
      users: true,
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

const postJoinableByUser = async (userId: string, postId: string) => {
  const targetPost = await getPost(postId);
  if (targetPost.users.length >= targetPost.partySize) return false;
  for (const user of targetPost.users) {
    if (user.userId == userId) return false;
  }

  return true;
};

const addUser = async (userId: string, postId: string) => {
  if (await postJoinableByUser(userId, postId))
    return await userService.linkUserToPost(userId, postId, UserStatus.MEMBER);
  return {
    status: 400,
    message:
      "post is not joinable by user (either post is full or user already in post)",
  };
};

const inviteUser = async (userId: string, postId: string) => {
  if (await postJoinableByUser(userId, postId))
    return await userService.linkUserToPost(userId, postId, UserStatus.PENDING);
  return {
    status: 400,
    message:
      "post is not joinable by user (either post is full or user already in post)",
  };
};

const acceptInvitation = async (userId: string, postId: string) => {
  return await userService.changeUserStatus(userId, postId, UserStatus.MEMBER);
};

const postService = {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  createPost,
  addUser,
  inviteUser,
  acceptInvitation,
};

export default postService;
