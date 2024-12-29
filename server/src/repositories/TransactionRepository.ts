import Transaction from "../model/transactionModel";
import { TransactionCreateTypes } from "../types/TransactionCreate";

class TransactionRepository {
  async create(data: TransactionCreateTypes) {
    const newTransaction = new Transaction(data);
    return await newTransaction.save();
  }
  async latestTransactions(userId: string) {
    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .limit(20)
      .select("description type date value -_id");
    return transactions;
  }
}

export default new TransactionRepository();
