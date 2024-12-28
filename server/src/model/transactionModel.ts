import mongoose from "mongoose";
import { TypeTransactionEnums } from "../enum/typeTransaction";
import Category from "./categoryModel";

const TransactionSchema = new mongoose.Schema(
  {
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
      enum: Object.values(TypeTransactionEnums),
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      validate: {
        validator: async function (value: mongoose.Types.ObjectId) {
          const category = await Category.findById(value);
          return category != null;
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
  },
  {
    timestamps: true,
  }
);

TransactionSchema.index({ userId: 1, categoryId: 1, date: 1 });

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
