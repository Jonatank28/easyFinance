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
const UserCategoryModel_1 = __importDefault(require("../model/UserCategoryModel"));
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const typeTransaction_1 = require("../enum/typeTransaction");
class CategoryRepository {
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCategoriesByUserId = yield UserCategoryModel_1.default.find({ userId })
                .populate("categoryId")
                .lean();
            const expense = [];
            const revenue = [];
            const investment = [];
            userCategoriesByUserId.forEach((uc) => {
                const { categoryId } = uc;
                const { _id, name, type } = categoryId;
                const category = { key: _id.toString(), label: name };
                if (type === typeTransaction_1.TypeTransactionEnums.Expense) {
                    expense.push(category);
                }
                else if (type === typeTransaction_1.TypeTransactionEnums.Revenue) {
                    revenue.push(category);
                }
                else if (type === typeTransaction_1.TypeTransactionEnums.Invested) {
                    investment.push(category);
                }
            });
            return { expense, revenue, investment };
        });
    }
    addCategoryToUser(userId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCategory = new UserCategoryModel_1.default({
                    userId,
                    categoryId,
                });
                yield userCategory.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOrCreateCategory(name, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = yield categoryModel_1.default.findOne({ name, type });
            if (!category) {
                category = new categoryModel_1.default({ name, type });
                yield category.save();
            }
            return category;
        });
    }
}
exports.default = new CategoryRepository();
