import { Application, Request, Response } from "express";
import { StringSchemaDefinition } from "mongoose";
import { isPropertyAccessOrQualifiedName } from "typescript";
import { UserDto, createUserDto, UserStatus } from "../../dto/user.dto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async () => {
  return await prisma.user.findMany();
};

const findUserInList = async (users: UserDto[], id: number) => {};

const changeUserStatus = async (
  userId: string,
  postId: string,
  status: UserStatus
) => {
  return await prisma.UserWithStatus.update({
    where: {
      userId: userId,
      postId: postId,
    },
    data: {
      status: status,
    },
  });
   
};

const linkUserToPost = async (
  userId: string,
  postId: string,
  status: UserStatus
) => {
  return await prisma.UserWithStatus.upsert({
    where: {
      userId: userId,
      postId: postId
    },
    create: {
      user: {
        connect: {
          userId: userId,
        },
      },
      status: status,
      post: {
        connect: {
          postId: postId,
        },
      },
    },
    update: {},
  });
};

const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      userId: id,
    },
  });
};

const createUser = async (user: createUserDto) => {
  return await prisma.user.create({
    data: { ...user },
  });
};

const updateUser = async (targetId: string, val: createUserDto) => {
  return await prisma.user.update({
    where: {
      userId: targetId,
    },
    data: {
      ...val,
    },
  });
};

const deleteUser = async (targetId: string) => {
  return await prisma.user.delete({
    where: {
      userId: targetId,
    },
  });
};

const getUserPosts = async (userId: string) => {
  return await prisma.UserWithStatus.findMany({
    where: {
      userId: userId,
    },
    include: {
      Post: true,
    }
  });
};

const acceptInvite = async (userId: string, postId: string) => {
  const search_res = await prisma.UserWithStatus.find({
    where: {
      userId: userId,
      postId: postId,
      status: UserStatus.PENDING,
    }
  });
  if(search_res) return await search_res.update({
    data: {
      status: UserStatus.MEMBER,
    },
    include: {
      user: true,
      Post: true
    },
  });
  else return {
    status: 404,
    message: "that tuple of userid, postid, status:pending was not found"
  };
};

const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  findUserInList,
  linkUserToPost,
  changeUserStatus,
  getUserPosts,
  acceptInvite,
};

export default userService;
