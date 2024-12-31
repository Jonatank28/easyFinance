import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { userCreateSchema } from "../schema/UserShema";
import UserService from "../services/UserService";
import { UserCreateTypes } from "../types/User";

class UserController {
  async create(req: Request<{}, {}, UserCreateTypes>, res: Response) {
    try {
      const data = req.body;
      userCreateSchema.parse(data);
      await UserService.create(data);

      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new UserController();
