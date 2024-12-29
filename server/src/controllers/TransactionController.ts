import { Request, Response } from "express";
import { TransactionCreateTypes } from "../types/TransactionCreate";
import {
  latestTransactionsSchema,
  transactionCreateSchema,
} from "../schema/TransactionShema";
import TransactionService from "../services/TransactionService";
import handleError from "../utils/handleError";

class TransactionController {
  // Create new transaction
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

  // latest transactions
  async latestTransactions(
    req: Request<{ userId: string }, {}, {}>,
    res: Response
  ): Promise<void> {
    const { userId } = req.params;
    latestTransactionsSchema.parse({ userId });

    const transactions = await TransactionService.latestTransactions(userId);
    res.status(200).json(transactions);

    try {
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new TransactionController();
