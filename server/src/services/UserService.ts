import UserRepository from "../repositories/UserRepository";
import { UserCreateTypes } from "../types/User";

class UserService {
  async create(data: UserCreateTypes) {
    try {
      const verifyExist = await UserRepository.verifyExists(
        data.userId,
        data.email
      );

      if (verifyExist) {
        throw new Error("Usuário já cadastrado");
      }

      await UserRepository.create(data);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
