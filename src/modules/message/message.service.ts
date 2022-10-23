import { MessageDto } from "../../dto/message.dto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getChat = async (postId: string) => {
  return await prisma.Message.findMany({
    where: {
      postId: postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};

const createMessage = async (
  authorId: string,
  postId: string,
  content: string
) => {
  try {
    return await prisma.Message.create({
      data: {
        author: {
          connect: {
            userId: authorId,
          },
        },
        content: content,
        post: {
          connect: {
            postId: postId,
          },
        },
        date: new Date(),
      },
    });
  } catch (error: any) {
    return {
      status: 500,
      message:
        "something bad happened, try checking that authorId and postId is valid",
    };
  }
};

const messageService = {
  getChat,
  createMessage,
};

export default messageService;
