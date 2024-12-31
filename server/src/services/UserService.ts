import UserRepository from "../repositories/UserRepository";
import { UserCreateTypes } from "../types/User";
import CategoryService from "./CategoryService";

class UserService {
  async create(data: UserCreateTypes) {
    try {
      await UserRepository.create(data);
      await CategoryService.addBaseCategoriesToUser(data.userId);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
