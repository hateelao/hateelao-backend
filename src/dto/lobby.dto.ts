import { MessageDto } from "./message.dto";
import { PostDto } from "./post.dto";

export interface LobbyDto {
    lobbyId : number;
    post : PostDto;
    chat : MessageDto[];
    status : boolean;
}
