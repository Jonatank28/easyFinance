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
exports.seedDataCategories = void 0;
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const categoriesBase_1 = require("../utils/categoriesBase");
const seedDataCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const category of categoriesBase_1.categoriesBase) {
            const categoryExists = yield categoryModel_1.default.findOne({ name: category.name });
            if (!categoryExists) {
                const newCategory = new categoryModel_1.default(category);
                yield newCategory.save();
            }
        }
        console.log("Seed Categories completed");
    }
    catch (error) {
        console.error("Error seeding categories:", error);
    }
});
exports.seedDataCategories = seedDataCategories;
