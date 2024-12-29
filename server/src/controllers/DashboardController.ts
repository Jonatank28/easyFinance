import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { getDataDashboardSchema } from "../schema/DashboardShema";
import DashboardService from "../services/DashboardService";

class dashboardController {
  async getDashboardData(
    req: Request<{ userId: string }, {}, {}>,
    res: Response
  ) {
    const { userId } = req.params;
    getDataDashboardSchema.parse({ userId });

    const result = await DashboardService.getDashboardData(userId);
    res.status(200).json(result);
    try {
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new dashboardController();
