import DashboardRepository from "../repositories/DashboardRepository";

class DashboardService {
  async getDashboardData(userId: string) {
    try {
      const lastTransactions = await DashboardRepository.latestTransactions(
        userId
      );
      const spendingCategory = await DashboardRepository.spendingCategory(
        userId
      );
      const valuesInformation = await DashboardRepository.valuesInformation(
        userId
      );
      const percentageType = await DashboardRepository.percentageType(userId);

      return {
        lastTransactions,
        spendingCategory,
        valuesInformation,
        percentageType,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new DashboardService();
