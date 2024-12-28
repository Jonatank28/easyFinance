import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import { TransactionCreateTypes } from "../types/TransactionCreate";
import { transactionCreateSchema } from "../schema/TransactionCreate";
import handleError from "../utils/handleError";

class TransactionController {
  async create(
    req: Request<{}, {}, TransactionCreateTypes>,
    res: Response
  ): Promise<void> {
    try {
      const data = {
        ...req.body,
        date: new Date(req.body.date),
      };
      transactionCreateSchema.parse(data);

      const transaction = await TransactionService.createTransaction(data);
      res
        .status(201)
        .json({ message: "Transaction created successfully", transaction });
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new TransactionController();
