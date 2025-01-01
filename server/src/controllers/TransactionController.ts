import { Request, Response } from "express";
import { TransactionCreateTypes } from "../types/Transaction";
import {
  transactionCreateSchema,
  TransactionsByMonthAndYearSchema,
} from "../schema/TransactionShema";
import TransactionService from "../services/TransactionService";
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

      const transaction = await TransactionService.create(data);
      res
        .status(201)
        .json({ message: "Transação criada com sucesso!", transaction });
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
  async getTransactionsByMonthAndYear(
    req: Request<{ userId: string; month: string; year: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { userId, month, year } = req.params;
      TransactionsByMonthAndYearSchema.parse({ userId, month, year });

      const transactions = await TransactionService.getAllByMonthAndYear(
        userId,
        month,
        year
      );
      res.status(200).json(transactions);
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new TransactionController();
