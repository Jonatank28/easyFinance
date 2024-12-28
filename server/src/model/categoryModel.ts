import mongoose from "mongoose";
import { TypeTransactionEnums } from "../enum/typeTransaction";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: Object.values(TypeTransactionEnums),
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
