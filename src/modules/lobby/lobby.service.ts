import { LobbyDto, LobbyStatus } from "../../dto/lobby.dto";
import { MessageDto } from "../../dto/message.dto";
import messageService from "../message/message.service";
import postService from "../post/post.service";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function isUserFirebaseIdInList(users: any[], userFirebaseId: string) {
  for (const user of users) {
    if (user.firebaseId == userFirebaseId) return true;
  }
  return false;
}

const getLobby = async (userFirebaseId: string, postId: string) => {
  const findResult = await postService.getPost(postId);

  if (!findResult) {
    return {
      status: 404,
      message: "post id was not found",
    };
  }
  const outStatus: LobbyStatus = isUserFirebaseIdInList(
    findResult.users,
    postId
  )
    ? LobbyStatus.JOINED
    : LobbyStatus.NOT_JOINED;

  const chatResult: MessageDto[] = await messageService.getChat(postId);

  const result: LobbyDto = {
    post: findResult.post,
    chat: chatResult,
    status: outStatus,
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
