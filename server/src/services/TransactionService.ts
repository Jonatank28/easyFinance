import TransactionRepository from "../repositories/TransactionRepository";
import { TransactionCreateTypes } from "../types/Transaction";

class TransactionService {
  async create(data: TransactionCreateTypes) {
    try {
      const savedTransaction = await TransactionRepository.create(data);
      return savedTransaction;
    } catch (error) {
      throw error;
    }
  }
  async getAllByMonthAndYear(userId: string, month: string, year: string) {
    try {
      const transactions = await TransactionRepository.getAllByMonthAndYear(
        userId,
        month,
        year
      );
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}

export default new TransactionService();
