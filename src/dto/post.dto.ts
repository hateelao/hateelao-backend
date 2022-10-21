import { UserDto } from "./user.dto";

export interface PostDto {
  postId: number;
  title: string;
  partySize: number;
  users: UserDto[];
  pendingUsers: UserDto[];
  owner: UserDto;
}
