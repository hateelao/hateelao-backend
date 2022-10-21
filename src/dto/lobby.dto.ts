import { MessageDto } from "./message.dto";
import { PostDto } from "./post.dto";
import { UserDto } from "./user.dto";

export interface LobbyDto {
    lobbyId : number;
    post : PostDto;
    chat : MessageDto[];
    status : boolean;
}
