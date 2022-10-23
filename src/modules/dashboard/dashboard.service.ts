import { Application, Request, Response } from "express";
import { dashboardDto } from "../../dto/dashboard.dto";
import { UserStatus } from "../../dto/user.dto";
import userService from "../user/user.service";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDashboard = async (userId: string) => {
  const dashboard: dashboardDto = { party: [], pendingParty: [] };
  const data = await userService.getUserPosts(userId);
  for (let i=0; i < data.length; i++){
    if (data[i].status == UserStatus.MEMBER || data[i].status == UserStatus.OWNER){
      dashboard.party.push(data[i].post);
    }
    if (data[i].status == UserStatus.PENDING){
      dashboard.pendingParty.push(data[i].post);
    }
  }
  return dashboard;
};

const dashboardService = {
  getDashboard,
};

export default dashboardService;
