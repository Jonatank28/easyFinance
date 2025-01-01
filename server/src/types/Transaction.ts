import { TypeTransactionEnums } from "../enum/typeTransaction";

export interface TransactionCreateTypes {
  userId: string;
  description: string;
  type: TypeTransactionEnums;
  categoryId: string;
  date: Date;
  value: number;
}

export type TransactionUpdateTypes = Omit<TransactionCreateTypes, "userId">;
