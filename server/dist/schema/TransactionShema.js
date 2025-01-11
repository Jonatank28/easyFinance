"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionUpdateSchema = exports.TransactionDeleteSchema = exports.TransactionsByMonthAndYearSchema = exports.transactionCreateSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const typeTransaction_1 = require("../enum/typeTransaction");
const transactionCreateSchema = zod_1.z.object({
    description: zod_1.z
        .string()
        .min(1, { message: "A descrição é obrigatória." })
        .trim(),
    type: zod_1.z.enum([
        typeTransaction_1.TypeTransactionEnums.Expense,
        typeTransaction_1.TypeTransactionEnums.Revenue,
        typeTransaction_1.TypeTransactionEnums.Invested,
    ], {
        message: "Tipo de transação inválido.",
    }),
    categoryId: zod_1.z.string().refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), {
        message: "ID da categoria inválido.",
    }),
    date: zod_1.z
        .string()
        .or(zod_1.z.date())
        .refine((val) => !isNaN(new Date(val).getTime()), {
        message: "Data inválida.",
    }),
    value: zod_1.z
        .number({ invalid_type_error: "O valor deve ser um número." })
        .min(0, { message: "O valor deve ser maior ou igual a 0." }),
});
exports.transactionCreateSchema = transactionCreateSchema;
const TransactionsByMonthAndYearSchema = zod_1.z.object({
    userId: zod_1.z.string().nonempty("userId deve ser uma string não vazia."),
    month: zod_1.z.string().nonempty("month deve ser uma string não vazia."),
    year: zod_1.z.string().nonempty("year deve ser uma string não vazia."),
});
exports.TransactionsByMonthAndYearSchema = TransactionsByMonthAndYearSchema;
const TransactionDeleteSchema = zod_1.z.object({
    transactionId: zod_1.z
        .string()
        .nonempty("transactionId deve ser uma string não vazia."),
});
exports.TransactionDeleteSchema = TransactionDeleteSchema;
const TransactionUpdateSchema = () => {
    const params = zod_1.z.object({
        transactionId: zod_1.z
            .string()
            .nonempty("transactionId deve ser uma string não vazia."),
    });
    const body = zod_1.z.object({
        description: zod_1.z.string(),
    });
    return { params, body };
};
exports.TransactionUpdateSchema = TransactionUpdateSchema;
