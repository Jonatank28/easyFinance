import DashboardRepository from "../repositories/DashboardRepository";
import UserRepository from "../repositories/UserRepository";
import { DashboardRequestTypes } from "../types/Dashboard";

class DashboardService {
  async getDashboardData(dataRequest: DashboardRequestTypes) {
    try {
      const lastTransactions = await DashboardRepository.latestTransactions(
        dataRequest
      );
      const spendingCategory = await DashboardRepository.spendingCategory(
        dataRequest
      );
      const valuesInformation = await DashboardRepository.valuesInformation(
        dataRequest
      );
      const existUser = await UserRepository.verifyExists(dataRequest.userId);

      return {
        lastTransactions,
        spendingCategory,
        valuesInformation,
        existUser,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new DashboardService();
