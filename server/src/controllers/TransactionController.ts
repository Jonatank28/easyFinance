import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import { TransactionRequest } from "../types/TransactionRequest";

class TransactionController {
  async create(
    req: Request<{}, {}, TransactionRequest>,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      const transaction = await TransactionService.createTransaction(data);
      res
        .status(201)
        .json({ message: "Transaction created successfully", transaction });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      } else {
        console.error("Unknown error", error);
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
}

export default new TransactionController();
