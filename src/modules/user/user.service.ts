import { Application, Request, Response } from "express";
import { UserDto, createUserDto } from "../../dto/user.dto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async () => {
  return await prisma.user.findMany();
};

const findUserInList = async (users: UserDto[], id: number) => {};

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

const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  findUserInList,
};

export default userService;
