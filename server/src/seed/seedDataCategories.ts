import Category from "../model/categoryModel";
import { categoriesBase } from "../utils/categoriesBase";

export const seedDataCategories = async () => {
  try {
    for (const category of categoriesBase) {
      const categoryExists = await Category.findOne({ name: category.name });
      if (!categoryExists) {
        const newCategory = new Category(category);
        await newCategory.save();
      }
    }
    console.log("Seed Categories completed");
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};
