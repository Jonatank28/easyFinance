import Transaction from "../model/transactionModel";
import { TransactionCreateTypes } from "../types/Transaction";
import { validateDateInput, getEndOfMonth } from "../utils/dateUtils";

class TransactionRepository {
  async create(data: TransactionCreateTypes) {
    const newTransaction = new Transaction(data);
    return await newTransaction.save();
  }

  async getAllByMonthAndYear(userId: string, month: string, year: string) {
    const startDate = validateDateInput(year, month);
    const endDate = getEndOfMonth(startDate);

    const transactions = await Transaction.aggregate([
      {
        $match: {
          userId,
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          id: "$_id",
          description: 1,
          type: 1,
          category: "$category.name",
          date: {
            $dateToString: { format: "%Y-%m-%d %H:%M", date: "$date" },
          },
          value: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d %H:%M", date: "$createdAt" },
          },
        },
      },
      { $sort: { date: -1 } },
    ]);

    return transactions;
  }
}

export default new TransactionRepository();
