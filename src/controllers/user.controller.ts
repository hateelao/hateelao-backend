import { Application, Request, Response } from "express";
import { UserDto } from "../dto/user.dto";
// import User from "../models/user.model";

const User = require("../models/user.model");

const users: UserDto[] = [];

// CRUD create read update delete

const getUsers = async (req: Request, res: Response) => {
  res.send(await User.find());
};

const findUserById = async (id: number) => {
  for (let i = 0; i < users.length; i++) {
    if (id == users[i].userId) {
      return users[i];
    }
  }
};

const findUserInList = async (checkUsers: UserDto[], id: number) => {
  for (let i = 0; i < checkUsers.length; i++) {
    if (id == checkUsers[i].userId) {
      return i;
    }
  }
  return -1;
};

const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (id == users[i].userId) {
      res.send(users[i]);
      return;
    }
  }
};

const createUser = async (req: Request, res: Response) => {
  // const newUser = new User(req.body);
  // newUser.save().then(data => {
  //   res.send(data);
  // })
  // .catch(err => {
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred while creating the User."
  //   });
  // });
};

// id
// user
// if(req.body.name){user.name = req.body.name}
// displayName : string
// photoURL : string
// firebaseId : string
const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (id == users[i].userId) {
      if (req.body.displayName) users[i].displayName = req.body.displayName;
      if (req.body.photoURL) users[i].photoURL = req.body.photoURL;
      if (req.body.firebaseId) users[i].firebaseId = req.body.firebaseId;
      res.send(users[i]);
      break;
    }
  }
  res.send("User not found");
};

const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (id == users[i].userId) {
      // delete users[i], also returns deleted elements (as list)
      res.send({ result: "success", deleted: users.splice(i) });
      break;
    }
  }
};

const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findUserInList,
};

export default userController;
