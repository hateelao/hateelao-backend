import { LobbyDto } from "../../dto/lobby.dto";
import { MessageDto } from "../../dto/message.dto";
import messageService from "../message/message.service";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getLobby = async (userFirebaseId: string, postId: string) => {
  const findResult = await prisma.UserWithStatus.findFirst({
    where: {
      user: {
        firebaseId: userFirebaseId,
      },
      postId: postId,
    },
    include: {
      post: {
        select: {
          users: true,
        },
      },
    },
  });

  if (!findResult)
    return {
      status: 400,
      message: "user is not in post or user and/or post does not exist",
    };

  const chatResult: MessageDto[] = await messageService.getChat(postId);

  const result: LobbyDto = {
    post: findResult.post,
    chat: chatResult,
    status: findResult.status,
  };
  return result;
};

const addMessage = async (
  authorFirebaseId: string,
  postId: string,
  content: string
) => {
  return await messageService.createMessage(authorFirebaseId, postId, content);
};

const lobbyService = {
  getLobby,
  addMessage,
};

export default lobbyService;
