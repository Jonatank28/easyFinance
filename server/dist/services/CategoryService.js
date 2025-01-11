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
const CategoryRepository_1 = __importDefault(require("../repositories/CategoryRepository"));
const categoriesBase_1 = require("../utils/categoriesBase");
class CategoryService {
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoriesByUser = yield CategoryRepository_1.default.getAllByUserId(userId);
                return categoriesByUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addBaseCategoriesToUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const category of categoriesBase_1.categoriesBase) {
                    const categoryRecord = yield CategoryRepository_1.default.findOrCreateCategory(category.name, category.type);
                    yield CategoryRepository_1.default.addCategoryToUser(userId, categoryRecord._id.toString());
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new CategoryService();
