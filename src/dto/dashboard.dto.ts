import { PostDto } from "./post.dto";

export interface dashboardDto {
  party: PostDto[];
  pendingParty: PostDto[];
}
