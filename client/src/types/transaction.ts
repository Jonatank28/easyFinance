import { TransactionTypeTypes } from "./transactionType";

export interface TransactionTypes {
  description: string;
  type: TransactionTypeTypes;
  value: number;
  id: string;
  category: string;
  categoryId: string;
  date: string;
  createdAt: string;
}
