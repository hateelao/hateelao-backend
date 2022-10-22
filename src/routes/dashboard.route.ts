import { Router } from "express";
import express, { Application, Request, Response } from "express";
import dashboardController from "../modules/dashboard/dashboard.controller";

export const dashboardRouter = Router();

dashboardRouter.get("/:id", dashboardController.getDashboard);
