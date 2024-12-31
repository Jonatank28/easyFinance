import UserCategory from "../model/UserCategoryModel";
import Category, { ICategory } from "../model/categoryModel";
import { TypeTransactionEnums } from "../enum/typeTransaction";

export interface SelectType {
  key: string;
  label: string;
}

class CategoryRepository {
  async getAllByUserId(userId: string) {
    const userCategoriesByUserId = await UserCategory.find({ userId })
      .populate<{ categoryId: ICategory }>("categoryId")
      .lean();

    const expense: SelectType[] = [];
    const revenue: SelectType[] = [];
    const investment: SelectType[] = [];

    userCategoriesByUserId.forEach((uc) => {
      const { categoryId } = uc;
      const { _id, name, type } = categoryId;

      const category: SelectType = { key: _id.toString(), label: name };

      if (type === TypeTransactionEnums.Expense) {
        expense.push(category);
      } else if (type === TypeTransactionEnums.Revenue) {
        revenue.push(category);
      } else if (type === TypeTransactionEnums.Invested) {
        investment.push(category);
      }
    });

    return { expense, revenue, investment };
  }

  async addCategoryToUser(userId: string, categoryId: string) {
    try {
      const userCategory = new UserCategory({
        userId,
        categoryId,
      });

      await userCategory.save();
    } catch (error) {
      throw error;
    }
  }

  async findOrCreateCategory(name: string, type: string) {
    let category = await Category.findOne({ name, type });

    if (!category) {
      category = new Category({ name, type });
      await category.save();
    }

    return category;
  }
}

export default new CategoryRepository();
