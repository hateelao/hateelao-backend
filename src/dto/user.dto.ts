export interface UserDto {
  userId: number;
  displayName: string;
  photoURL: string;
  firebaseId: string;
}

export interface createUserDto {
  displayName: string;
  photoURL: string;
  firebaseId: string;
}
