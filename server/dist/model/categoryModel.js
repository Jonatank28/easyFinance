"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const typeTransaction_1 = require("../enum/typeTransaction");
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    icon: {
        type: String,
        default: "icon-default",
    },
    type: {
        type: String,
        enum: Object.values(typeTransaction_1.TypeTransactionEnums),
        required: true,
    },
});
CategorySchema.index({ name: 1, type: 1 });
const Category = mongoose_1.default.model("Category", CategorySchema);
exports.default = Category;
