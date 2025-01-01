import { TransactionTypeTypes } from "./transactionType";

export interface LastTransaction {
  id: string;
  description: string;
  type: TransactionTypeTypes;
  date: string;
  value: number;
}

export interface SpendingCategory {
  id: string;
  name: string;
  total: number;
  percentage: string;
}

export interface ValuesInformation {
  revenue: string;
  expense: string;
  investment: string;
  balance: string;
}

export interface PercentageType {
  type: TransactionTypeTypes;
  value: string;
  percentage: string;
}
