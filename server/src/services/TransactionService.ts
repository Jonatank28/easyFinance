import Transaction from "../model/transactionModel";
import { TransactionCreateTypes } from "../types/TransactionCreate";

class TransactionService {
  async createTransaction(data: TransactionCreateTypes) {
    try {
      const newTransaction = new Transaction({
        ...data,
      });

      const savedTransaction = await newTransaction.save();

      console.log("Transaction created:", savedTransaction);

      return savedTransaction;
    } catch (error) {
      throw error;
    }
  }
}

export default new TransactionService();
