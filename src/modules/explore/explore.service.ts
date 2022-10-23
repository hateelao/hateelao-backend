import { Application, Request, Response } from "express";
import { UserStatus } from "../../dto/user.dto";
import { ExploreDto } from "../../dto/explore.dto";
import postService from "../post/post.service";

const getExplore = async () => {
  const explore: ExploreDto = { posts: [] }; // PostDTO[] = [];
  const data = await postService.getPosts();
  explore.posts = data;
  return explore;
};

const exploreService = {
  getExplore,
};
export default exploreService;
