import { Application, Request, Response } from "express";
import { dashboardDto } from "../../dto/dashboard.dto";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDashboard = async (userId: number) => {
  const dashboard: dashboardDto = { party: [], pendingParty: [] };
  const data = await prisma.user.findMany({
    include: { UserWithStatus: true },
  });
  return data;
};

const dashboardService = {
  getDashboard,
};

export default dashboardService;
