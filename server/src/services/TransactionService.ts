import TransactionRepository from "../repositories/TransactionRepository";
import { TransactionCreateTypes } from "../types/TransactionCreate";

class TransactionService {
  async create(data: TransactionCreateTypes) {
    try {
      const savedTransaction = await TransactionRepository.create(data);
      return savedTransaction;
    } catch (error) {
      throw error;
    }
  }
  async latestTransactions(userId: string) {
    try {
      const latestTransactions = await TransactionRepository.latestTransactions(
        userId
      );
      return latestTransactions;
    } catch (error) {
      throw error;
    }
  }
}

export default new TransactionService();
