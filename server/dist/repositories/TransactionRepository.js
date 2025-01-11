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
const dateUtils_1 = require("../utils/dateUtils");
class TransactionRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTransaction = new transactionModel_1.default(data);
            return yield newTransaction.save();
        });
    }
    getAllByMonthAndYear(userId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = (0, dateUtils_1.validateDateInput)(year, month);
            const endDate = (0, dateUtils_1.getEndOfMonth)(startDate);
            const transactions = yield transactionModel_1.default.aggregate([
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
                        categoryId: "$categoryId",
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
        });
    }
    findById(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield transactionModel_1.default.findById(transactionId);
        });
    }
    update(transactionId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield transactionModel_1.default.findByIdAndUpdate(transactionId, data);
        });
    }
    delete(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield transactionModel_1.default.findByIdAndDelete(transactionId);
        });
    }
}
exports.default = new TransactionRepository();
