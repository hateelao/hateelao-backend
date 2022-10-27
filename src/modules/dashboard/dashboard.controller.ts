import { Request, Response } from "express";
import dashboardService from "./dashboard.service";

const getDashboard = async (req: Request, res: Response) => {
  const userFirebaseId = req.params.id;
  res.send(await dashboardService.getDashboard(userFirebaseId));
};

const dashboardController = {
  getDashboard,
};

export default dashboardController;
