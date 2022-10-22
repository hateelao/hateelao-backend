import { UserDto } from "./user.dto";

export interface MessageDto {
  author: UserDto;
  message: string;
  date: Date;
}
