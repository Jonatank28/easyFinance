"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserCategorySchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
});
UserCategorySchema.index({ userId: 1, categoryId: 1 }, { unique: true });
const UserCategory = mongoose_1.default.model("UserCategory", UserCategorySchema);
exports.default = UserCategory;
