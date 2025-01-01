import { z } from "zod";
import mongoose from "mongoose";
import { TypeTransactionEnums } from "../enum/typeTransaction";

const transactionCreateSchema = z.object({
  description: z
    .string()
    .min(1, { message: "A descrição é obrigatória." })
    .trim(),

  type: z.enum(
    [
      TypeTransactionEnums.Expense,
      TypeTransactionEnums.Revenue,
      TypeTransactionEnums.Invested,
    ],
    {
      message: "Tipo de transação inválido.",
    }
  ),

  categoryId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "ID da categoria inválido.",
  }),

  date: z
    .string()
    .or(z.date())
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Data inválida.",
    }),

  value: z
    .number({ invalid_type_error: "O valor deve ser um número." })
    .min(0, { message: "O valor deve ser maior ou igual a 0." }),
});

const TransactionsByMonthAndYearSchema = z.object({
  userId: z.string().nonempty("userId deve ser uma string não vazia."),
  month: z.string().nonempty("month deve ser uma string não vazia."),
  year: z.string().nonempty("year deve ser uma string não vazia."),
});

export { transactionCreateSchema, TransactionsByMonthAndYearSchema };
