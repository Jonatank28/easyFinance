import Transaction from "../model/transactionModel";
import { TransactionCreateTypes } from "../types/Transaction";

class TransactionRepository {
  async create(data: TransactionCreateTypes) {
    const newTransaction = new Transaction(data);
    return await newTransaction.save();
  }
}

export default new TransactionRepository();
