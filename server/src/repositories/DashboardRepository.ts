import Transaction from "../model/transactionModel";
import { format, parse, isValid, endOfMonth } from "date-fns";
import { DashboardRequestTypes } from "../types/Dashboard";

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
  validateDateInput(year: string, month: string) {
    // Ajusta para lidar com inversões de valores
    if (Number(year) < 1000) {
      [year, month] = [month, year];
    }

    if (!year || !month || isNaN(Number(year)) || isNaN(Number(month))) {
      throw new Error("Invalid year or month format");
    }

    const parsedDate = parse(`${year}-${month}-01`, "yyyy-MM-dd", new Date());
    if (!isValid(parsedDate)) {
      throw new Error("Invalid year or month format");
    }
    return parsedDate;
  }

  async latestTransactions(dataRequest: DashboardRequestTypes) {
    const { userId, month, year } = dataRequest;

    // Validação de datas
    const startDate = this.validateDateInput(year, month);
    const endDate = endOfMonth(startDate);

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

    // Validação de datas
    const startDate = this.validateDateInput(year, month);
    const endDate = endOfMonth(startDate);

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

    // Validação de datas
    const startDate = this.validateDateInput(year, month);
    const endDate = endOfMonth(startDate);

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
