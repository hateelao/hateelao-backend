import { Application, Request, Response } from "express";
import { dashboardDto } from "../dto/dashboard.dto";
import { PostDto } from "../dto/post.dto";
import { getAllPosts } from "./post.controller";

const getDashboard = async (req: Request, res: Response) => {
  const dashboard: dashboardDto = { party: [], pendingParty: [] };
  const userId = parseInt(req.params.id);
  const posts = getAllPosts();
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const users = post.users;
    const pendingUsers = post.pendingUsers;
    // this post have userId in party => owner / member (in users)
    // this post have userId in pendingParty => pendingUser
    for (let j = 0; j < users.length; j++) {
      const user = users[j];
      if (user.userId == userId) {
        dashboard.party.push(post);
        break;
      }
    }
    //if (post.owner.userId == userId) {
      dashboard.party.push(post);
    }
    for (let j = 0; j < pendingUsers.length; j++) {
      const user = pendingUsers[j];
      if (user.userId == userId) {
        dashboard.pendingParty.push(post);
        break;
      }
    }
  }
  res.send(dashboard);
};

const dashboardController = {
  getDashboard,
};

export default dashboardController;
