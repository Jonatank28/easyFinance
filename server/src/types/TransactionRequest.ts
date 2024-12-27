import { CategoryType } from "../model/categoryModel";

export interface TransactionRequest {
  amount: number;
  description: string;
  type: CategoryType;
}
