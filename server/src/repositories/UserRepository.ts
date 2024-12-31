import User from "../model/UserModel";
import { UserCreateTypes } from "../types/User";

class UserRepository {
  async verifyExists(userId: string, email: string) {
    const user = await User.findOne({ userId, email });

    if (user) {
      return true;
    } else {
      return false;
    }
  }
  async create(data: UserCreateTypes) {
    const newUser = new User(data);
    return await newUser.save();
  }
}

export default new UserRepository();
