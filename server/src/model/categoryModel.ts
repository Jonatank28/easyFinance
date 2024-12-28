import mongoose, { Document } from "mongoose";
import { TypeTransactionEnums } from "../enum/typeTransaction";

export interface ICategory extends Document {
  name: string;
  type: TypeTransactionEnums;
}

const CategorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  type: {
    type: String,
    enum: Object.values(TypeTransactionEnums),
    required: true,
  },
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
