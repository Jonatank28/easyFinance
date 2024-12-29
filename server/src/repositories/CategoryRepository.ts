import UserCategory from "../model/UserCategoryModel";
import { TypeTransactionEnums } from "../enum/typeTransaction";
import { ICategory } from "../model/categoryModel";

interface CategoryWithId {
  key: string;
  label: string;
}

class CategoryRepository {
  async getAllByUserId(userId: string) {
    const userCategoriesByUserId = await UserCategory.find({ userId })
      .populate<{ categoryId: ICategory }>("categoryId")
      .lean();

    const categoriesByType: {
      [key in TypeTransactionEnums]: CategoryWithId[];
    } = {
      [TypeTransactionEnums.Expense]: [],
      [TypeTransactionEnums.Revenue]: [],
      [TypeTransactionEnums.Invested]: [],
    };

    userCategoriesByUserId.forEach((uc) => {
      const { _id, name, type } = uc.categoryId;

      if (categoriesByType[type]) {
        categoriesByType[type].push({ key: _id.toString(), label: name });
      }
    });

    return categoriesByType;
  }
}

export default new CategoryRepository();
