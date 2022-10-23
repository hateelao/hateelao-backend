export interface UserDto {
  userId: string;
  displayName: string;
  photoURL: string;
  firebaseId: string;
}

export interface createUserDto {
  displayName: string;
  photoURL: string;
  firebaseId: string;
}

export enum UserStatus {
  MEMBER = "MEMBER",
  PENDING = "PENDING",
  OWNER = "OWNER",
}
