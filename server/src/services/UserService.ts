import UserRepository from "../repositories/UserRepository";
import { UserCreateTypes } from "../types/User";

class UserService {
  async create(data: UserCreateTypes) {
    try {
      await UserRepository.create(data);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
