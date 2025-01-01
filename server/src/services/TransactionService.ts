import TransactionRepository from "../repositories/TransactionRepository";
import {
  TransactionCreateTypes,
  TransactionUpdateTypes,
} from "../types/Transaction";

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

  async update(transactionId: string, data: TransactionUpdateTypes) {
    try {
      const transaction = await TransactionRepository.findById(transactionId);
      if (!transaction) {
        throw new Error("Transaction not found");
      }

      await TransactionRepository.update(transactionId, data);
    } catch (error) {
      throw error;
    }
  }

  async delete(transactionId: string) {
    try {
      const transaction = await TransactionRepository.findById(transactionId);
      if (!transaction) {
        throw new Error("Transaction not found");
      }

      await TransactionRepository.delete(transactionId);
    } catch (error) {
      throw error;
    }
  }
}

export default new TransactionService();
