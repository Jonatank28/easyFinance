import UserCategory from "../model/UserCategoryModel";

class CategoryRepository {
  async getAllByUserId(userId: string) {
    const userCategoriesByUserId = await UserCategory.find({ userId }).populate(
      "categoryId"
    );

    return userCategoriesByUserId.map((uc) => {
      const { _id, name, type } = uc.categoryId;
      return { id: _id, name, type };
    });
  }
}

export default new CategoryRepository();
