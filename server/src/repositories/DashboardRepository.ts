import Transaction from "../model/transactionModel";

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
  async latestTransactions(userId: string) {
    const transactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .limit(20)
      .select("description type date value")
      .lean();

    return transactions.map((transaction) => ({
      id: transaction._id,
      description: transaction.description,
      type: transaction.type,
      date: transaction.date,
      value: transaction.value,
    }));
  }

  async spendingCategory(userId: string) {
    const result = await Transaction.aggregate([
      { $match: { userId } },
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

  async valuesInformation(userId: string) {
    const result = await Transaction.aggregate([
      { $match: { userId } },
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

  async percentageType(userId: string) {
    const result = await Transaction.aggregate([
      { $match: { userId } },
      { $group: { _id: "$type", total: { $sum: "$value" } } },
    ]);

    const { revenue, expense, investment } = calculateValues(result);

    const totalSum = revenue + expense + investment;

    return [
      {
        type: "revenue",
        value: revenue.toFixed(2),
        percentage:
          totalSum > 0 ? ((revenue / totalSum) * 100).toFixed(2) : "0.00",
      },
      {
        type: "expense",
        value: expense.toFixed(2),
        percentage:
          totalSum > 0 ? ((expense / totalSum) * 100).toFixed(2) : "0.00",
      },
      {
        type: "investment",
        value: investment.toFixed(2),
        percentage:
          totalSum > 0 ? ((investment / totalSum) * 100).toFixed(2) : "0.00",
      },
    ];
  }
}

export default new DashboardRepository();
