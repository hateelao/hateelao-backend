import { Request, Response } from "express";
import exploreService from "../explore/explore.service";


const getExplore = async (req: Request, res: Response) => {
  const result = await exploreService.getExplore();
  res.send(result);
};

const exploreController = {
  getExplore,
}


export default exploreController;
