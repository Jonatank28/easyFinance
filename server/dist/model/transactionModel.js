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
const mongoose_1 = __importDefault(require("mongoose"));
const typeTransaction_1 = require("../enum/typeTransaction");
const categoryModel_1 = __importDefault(require("./categoryModel"));
const TransactionSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: Object.values(typeTransaction_1.TypeTransactionEnums),
        required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const category = yield categoryModel_1.default.findById(value);
                    return category != null;
                });
            },
            message: "Categoria não encontrada.",
        },
    },
    date: {
        type: Date,
        required: true,
    },
    value: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});
TransactionSchema.index({ userId: 1, categoryId: 1, date: 1 });
const Transaction = mongoose_1.default.model("Transaction", TransactionSchema);
exports.default = Transaction;
