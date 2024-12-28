import { TypeTransactionEnums } from "../enum/typeTransaction";

export interface TransactionCreateTypes {
  description: string;
  type: TypeTransactionEnums;
  categoryId: string;
  date: Date;
  value: number;
}
