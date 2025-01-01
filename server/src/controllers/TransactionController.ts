import { Request, Response } from "express";
import {
  TransactionCreateTypes,
  TransactionUpdateTypes,
} from "../types/Transaction";
import {
  transactionCreateSchema,
  TransactionDeleteSchema,
  TransactionsByMonthAndYearSchema,
  TransactionUpdateSchema,
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

  // Get all transactions by month and year
  async getAllByMonthAndYear(
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

  // Update transaction
  async update(
    req: Request<{ transactionId: string }, {}, TransactionUpdateTypes>,
    res: Response
  ): Promise<void> {
    try {
      const { transactionId } = req.params;
      const { body, params } = TransactionUpdateSchema();
      params.parse({ transactionId });
      body.parse(req.body);

      await TransactionService.update(transactionId, req.body);
      res.status(200).json({ message: "Transação atualizada com sucesso!" });
    } catch (error: unknown) {
      handleError(error, res);
    }
  }

  // Delete transaction
  async delete(
    req: Request<{ transactionId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { transactionId } = req.params;
      TransactionDeleteSchema.parse({ transactionId });

      await TransactionService.delete(transactionId);
      res.status(200).json({ message: "Transação deletada com sucesso!" });
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}

export default new TransactionController();
