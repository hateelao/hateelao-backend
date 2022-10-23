import { UserDto, createUserDto, UserStatus } from "../../dto/user.dto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByFirebaseId = async (firebaseId: string) => {
  return await prisma.User.findUnique({
    where: {
      firebaseId: firebaseId,
    },
  });
};

const getUsers = async () => {
  return await prisma.user.findMany();
};

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
  const findRel = await prisma.UserWithStatus.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  if (findRel)
    return {
      status: 400,
      message: "user already exists in post",
    };
  return await prisma.UserWithStatus.create({
    data: {
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
      post: true,
    },
  });
};

const acceptInvite = async (userId: string, postId: string) => {
  return await prisma.UserWithStatus.updateMany({
    where: {
      userId: userId,
      postId: postId,
    },
    data: {
      status: UserStatus.MEMBER,
    },
  });
};

const userService = {
  getUserByFirebaseId,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  linkUserToPost,
  changeUserStatus,
  getUserPosts,
  acceptInvite,
};

export default userService;
