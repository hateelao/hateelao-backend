import { ExploreDto } from "../../dto/explore.dto";
import postService from "../post/post.service";

const getExplore = async () => {
  const explore: ExploreDto = { posts: [] }; // PostDTO[] = [];
  const data = await postService.getPosts();
  explore.posts = data.map((post: any) => postService.parsePost(post));
  return explore;
};

const exploreService = {
  getExplore,
};
export default exploreService;
