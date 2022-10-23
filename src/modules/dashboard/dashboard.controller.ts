import { Request, Response } from "express";
import dashboardService from "./dashboard.service";

const getDashboard = async (req: Request, res: Response) => {
  const userId = req.params.id;
  res.send(await dashboardService.getDashboard(userId));
};

const dashboardController = {
  getDashboard,
};

export default dashboardController;
