import mongoose, { Document } from "mongoose";
import { ICategory } from "./categoryModel";

export interface IUserCategory extends Document {
  userId: string;
  categoryId: ICategory;
}

const UserCategorySchema = new mongoose.Schema<IUserCategory>({
  userId: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

UserCategorySchema.index({ userId: 1, categoryId: 1 }, { unique: true });

const UserCategory = mongoose.model<IUserCategory>(
  "UserCategory",
  UserCategorySchema
);
export default UserCategory;
