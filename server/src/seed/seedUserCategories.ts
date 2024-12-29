import Category from "../model/categoryModel";
import UserCategory from "../model/UserCategoryModel";

// ID do usuário que receberá as categorias
const userId = "user_2qtGOJ0U5rFqKz0QEqWU7THHnxE";

export const seedUserCategories = async () => {
  try {
    const Categories = await Category.find();

    for (const category of Categories) {
      const exists = await UserCategory.findOne({
        userId,
        categoryId: category._id,
      });

      if (!exists) {
        const newUserCategory = new UserCategory({
          userId,
          categoryId: category._id,
        });
        await newUserCategory.save();
      }
    }

    console.log(`Seed UserCategories completed for user ${userId}`);
  } catch (error) {
    console.error("Error associating categories with user:", error);
  }
};
