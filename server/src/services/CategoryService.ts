import CategoryRepository from "../repositories/CategoryRepository";

class CategoryService {
  async getAllByUserId(userId: string) {
    try {
      const getAllCategoryesByUserId = await CategoryRepository.getAllByUserId(
        userId
      );
      return getAllCategoryesByUserId;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryService();
