import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { getDataDashboardSchema } from "../schema/DashboardShema";
import DashboardService from "../services/DashboardService";
import { DashboardRequestTypes } from "../types/Dashboard";

class dashboardController {
  // Get Data Dashboard by user, month and year
  async getDashboardData(
    req: Request<DashboardRequestTypes, {}, {}>,
    res: Response
  ) {
    const { userId, month, year } = req.params;
    getDataDashboardSchema.parse({ userId, month, year });

    const result = await DashboardService.getDashboardData(req.params);
    res.status(200).json(result);
    try {
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new dashboardController();
