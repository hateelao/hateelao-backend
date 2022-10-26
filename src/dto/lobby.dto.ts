import { MessageDto } from "./message.dto";
import { PostDto } from "./post.dto";
import { UserStatus } from "./user.dto";

export interface LobbyDto {
  post: PostDto;
  chat: MessageDto[];
  status: LobbyStatus;
}

export enum LobbyStatus {
  JOINED = "JOINED",
  NOT_JOINED = "NOT_JOINED",
}
