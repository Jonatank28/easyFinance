import express from "express";
import DashboardController from "../controllers/DashboardController";

const router = express.Router();
const prefix = "/dashboard";

router.get(
  prefix + "/getDashboardData/:userId/:month/:year",
  DashboardController.getDashboardData
);

export default router;
