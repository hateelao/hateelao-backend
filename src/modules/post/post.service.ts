import { createPostDto, PostDto } from "../../dto/post.dto";
import { UserStatus } from "../../dto/user.dto";
import userService from "../user/user.service";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

const getPosts = async () => {
  return await prisma.post.findMany({
    include: {
      users: {
        include: {
          user: true,
        },
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
      users: {
        include: {
          user: true,
        },
      },
    },
  });
};

const createPost = async (post: createPostDto) => {
  return await prisma.UserWithStatus.create({
    data: {
      user: {
        connect: {
          firebaseId: post.ownerFirebaseId,
        },
      },
      status: UserStatus.OWNER,
      post: {
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
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        postId: targetId,
      },
    });
    const deletedUserWithStatus = await prisma.UserWithStatus.deleteMany({
      where: {
        postId: targetId,
      },
    });
    return {
      deletedPost: deletedPost,
      deletedUserWithStatus: deletedUserWithStatus,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "something went wrong",
    };
  }
};

const postJoinableByUser = async (userFirebaseId: string, postId: string) => {
  const targetPost = await getPost(postId);
  if (targetPost.users.length >= targetPost.partySize) return false;
  for (const user of targetPost.users) {
    if (user.firebaseId == userFirebaseId) return false;
  }

  return true;
};

const addUser = async (userFirebaseId: string, postId: string) => {
  if (await postJoinableByUser(userFirebaseId, postId))
    return await userService.linkUserToPost(
      userFirebaseId,
      postId,
      UserStatus.MEMBER
    );
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
  parsePost,
};

export default postService;
