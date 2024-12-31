import DashboardRepository from "../repositories/DashboardRepository";
import UserRepository from "../repositories/UserRepository";
import { DashboardRequestTypes } from "../types/Dashboard";

class DashboardService {
  async getDashboardData(dataRequest: DashboardRequestTypes) {
    const defaultResponse = {
      lastTransactions: [],
      spendingCategory: [],
      valuesInformation: {
        revenue: 0,
        expense: 0,
        investment: 0,
        balance: 0,
      },
      existUser: false,
    };

    try {
      const existUser = await UserRepository.verifyExists(dataRequest.userId);
      if (!existUser) return defaultResponse;

      const [lastTransactions, spendingCategory, valuesInformation] =
        await Promise.all([
          DashboardRepository.latestTransactions(dataRequest),
          DashboardRepository.spendingCategory(dataRequest),
          DashboardRepository.valuesInformation(dataRequest),
        ]);

      return {
        lastTransactions,
        spendingCategory,
        valuesInformation,
        existUser,
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  }
}

export default new DashboardService();
