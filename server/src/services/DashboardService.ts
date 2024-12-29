import DashboardRepository from "../repositories/DashboardRepository";
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

      return {
        lastTransactions,
        spendingCategory,
        valuesInformation,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new DashboardService();
