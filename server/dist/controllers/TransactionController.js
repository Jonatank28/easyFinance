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
const TransactionShema_1 = require("../schema/TransactionShema");
const TransactionService_1 = __importDefault(require("../services/TransactionService"));
const handleError_1 = __importDefault(require("../utils/handleError"));
class TransactionController {
    // Create new transaction
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = Object.assign(Object.assign({}, req.body), { date: new Date(req.body.date) });
                TransactionShema_1.transactionCreateSchema.parse(data);
                const transaction = yield TransactionService_1.default.create(data);
                res
                    .status(201)
                    .json({ message: "Transação criada com sucesso!", transaction });
            }
            catch (error) {
                (0, handleError_1.default)(error, res);
            }
        });
    }
    // Get all transactions by month and year
    getAllByMonthAndYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, month, year } = req.params;
                TransactionShema_1.TransactionsByMonthAndYearSchema.parse({ userId, month, year });
                const transactions = yield TransactionService_1.default.getAllByMonthAndYear(userId, month, year);
                res.status(200).json(transactions);
            }
            catch (error) {
                (0, handleError_1.default)(error, res);
            }
        });
    }
    // Update transaction
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transactionId } = req.params;
                const { body, params } = (0, TransactionShema_1.TransactionUpdateSchema)();
                params.parse({ transactionId });
                body.parse(req.body);
                yield TransactionService_1.default.update(transactionId, req.body);
                res.status(200).json({ message: "Transação atualizada com sucesso!" });
            }
            catch (error) {
                (0, handleError_1.default)(error, res);
            }
        });
    }
    // Delete transaction
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transactionId } = req.params;
                TransactionShema_1.TransactionDeleteSchema.parse({ transactionId });
                yield TransactionService_1.default.delete(transactionId);
                res.status(200).json({ message: "Transação deletada com sucesso!" });
            }
            catch (error) {
                (0, handleError_1.default)(error, res);
            }
        });
    }
}
exports.default = new TransactionController();
