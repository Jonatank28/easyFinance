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
const TransactionRepository_1 = __importDefault(require("../repositories/TransactionRepository"));
class TransactionService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const savedTransaction = yield TransactionRepository_1.default.create(data);
                return savedTransaction;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllByMonthAndYear(userId, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield TransactionRepository_1.default.getAllByMonthAndYear(userId, month, year);
                return transactions;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(transactionId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield TransactionRepository_1.default.findById(transactionId);
                if (!transaction) {
                    throw new Error("Transaction not found");
                }
                yield TransactionRepository_1.default.update(transactionId, data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield TransactionRepository_1.default.findById(transactionId);
                if (!transaction) {
                    throw new Error("Transaction not found");
                }
                yield TransactionRepository_1.default.delete(transactionId);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new TransactionService();
