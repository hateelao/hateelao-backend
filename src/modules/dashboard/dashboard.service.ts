import { dashboardDto } from "../../dto/dashboard.dto";
import { UserStatus } from "../../dto/user.dto";
import postService from "../post/post.service";
import userService from "../user/user.service";

const getDashboard = async (firebaseId: string) => {
  const dashboard: dashboardDto = { party: [], pendingParty: [] };
  const data = await userService.getUserPosts(firebaseId);
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].status == UserStatus.MEMBER ||
      data[i].status == UserStatus.OWNER
    ) {
      dashboard.party.push(postService.parsePost(data[i].post));
    }
    if (data[i].status == UserStatus.PENDING) {
      dashboard.pendingParty.push(postService.parsePost(data[i].post));
    }
  }
  return dashboard;
};

const dashboardService = {
  getDashboard,
};

export default dashboardService;
