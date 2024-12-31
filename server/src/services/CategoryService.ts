import CategoryRepository from "../repositories/CategoryRepository";
import { categoriesBase } from "../utils/categoriesBase";
class CategoryService {
  async getAllByUserId(userId: string) {
    try {
      const categoriesByUser = await CategoryRepository.getAllByUserId(userId);
      return categoriesByUser;
    } catch (error) {
      throw error;
    }
  }

  async addBaseCategoriesToUser(userId: string) {
    try {
      for (const category of categoriesBase) {
        const categoryRecord = await CategoryRepository.findOrCreateCategory(
          category.name,
          category.type
        );

        await CategoryRepository.addCategoryToUser(
          userId,
          categoryRecord._id.toString()
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
