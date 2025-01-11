"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionModel_1 = __importDefault(require("../model/transactionModel"));
const date_fns_1 = require("date-fns");
const dateUtils_1 = require("../utils/dateUtils");
const calculateValues = (result) => {
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
    latestTransactions(dataRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, month, year } = dataRequest;
            const startDate = (0, dateUtils_1.validateDateInput)(year, month);
            const endDate = (0, dateUtils_1.getEndOfMonth)(startDate);
            const transactions = yield transactionModel_1.default.find({
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
                date: (0, date_fns_1.format)(transaction.date, "yyyy-MM-dd HH:mm"),
                value: transaction.value,
            }));
        });
    }
    spendingCategory(dataRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, month, year } = dataRequest;
            const startDate = (0, dateUtils_1.validateDateInput)(year, month);
            const endDate = (0, dateUtils_1.getEndOfMonth)(startDate);
            const result = yield transactionModel_1.default.aggregate([
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
                percentage: totalSum > 0 ? ((item.total / totalSum) * 100).toFixed(2) : "0.00",
            }));
        });
    }
    valuesInformation(dataRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, month, year } = dataRequest;
            const startDate = (0, dateUtils_1.validateDateInput)(year, month);
            const endDate = (0, dateUtils_1.getEndOfMonth)(startDate);
            const result = yield transactionModel_1.default.aggregate([
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
        });
    }
}
exports.default = new DashboardRepository();
