import mongoose from "mongoose";

export enum CategoryType {
  Expense = "expense", // Despesa
  Revenue = "revenue", // Receita
  Invested = "invested", // Investido
}

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: Object.values(CategoryType),
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
