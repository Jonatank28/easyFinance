import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { CategoryGetAllByUserIdSchema } from "../schema/CategoryShema";
import CategoryService from "../services/CategoryService";

class CategoryController {
  // List full categories
  async getAllByUserId(
    req: Request<{ userId: string }, {}, {}>,
    res: Response
  ) {
    const { userId } = req.params;
    CategoryGetAllByUserIdSchema.parse({ userId });

    const categoryes = await CategoryService.getAllByUserId(userId);
    res.status(200).json(categoryes);
    try {
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new CategoryController();
