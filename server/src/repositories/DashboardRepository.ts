import Transaction from "../model/transactionModel";
import { format } from "date-fns";
import { DashboardRequestTypes } from "../types/Dashboard";
import { validateDateInput, getEndOfMonth } from "../utils/dateUtils";

const calculateValues = (result: any[]) => {
  let revenue = 0;
  let expense = 0;
  let investment = 0;

  result.forEach((item) => {
    switch (item._id) {
      case "revenue":
        revenue = item.total;
        break;
      case "expense":
        expense = item.total;
        break;
      case "investment":
        investment = item.total;
        break;
      default:
        break;
    }
  });

  return { revenue, expense, investment };
};

class DashboardRepository {
  async latestTransactions(dataRequest: DashboardRequestTypes) {
    const { userId, month, year } = dataRequest;

    const startDate = validateDateInput(year, month);
    const endDate = getEndOfMonth(startDate);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    })
      .sort({ date: -1 })
      .limit(20)
      .select("description type date value")
      .lean();

    return transactions.map((transaction) => ({
      id: transaction._id,
      description: transaction.description,
      type: transaction.type,
      date: format(transaction.date, "yyyy-MM-dd HH:mm"),
      value: transaction.value,
    }));
  }

  async spendingCategory(dataRequest: DashboardRequestTypes) {
    const { userId, month, year } = dataRequest;

    const startDate = validateDateInput(year, month);
    const endDate = getEndOfMonth(startDate);

    const result = await Transaction.aggregate([
      { $match: { userId, date: { $gte: startDate, $lte: endDate } } },
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
        $group: {
          _id: "$categoryId",
          name: { $first: "$category.name" },
          total: { $sum: "$value" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const totalSum = result.reduce((acc, curr) => acc + curr.total, 0);

    return result.map((item) => ({
      id: item._id,
      name: item.name,
      total: item.total,
      percentage:
        totalSum > 0 ? ((item.total / totalSum) * 100).toFixed(2) : "0.00",
    }));
  }

  async valuesInformation(dataRequest: DashboardRequestTypes) {
    const { userId, month, year } = dataRequest;

    const startDate = validateDateInput(year, month);
    const endDate = getEndOfMonth(startDate);

    const result = await Transaction.aggregate([
      { $match: { userId, date: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$type", total: { $sum: "$value" } } },
    ]);

    const { revenue, expense, investment } = calculateValues(result);

    const balance = (revenue - expense).toFixed(2);

    return {
      revenue: revenue.toFixed(2),
      expense: expense.toFixed(2),
      investment: investment.toFixed(2),
      balance: balance,
    };
  }
}

export default new DashboardRepository();
