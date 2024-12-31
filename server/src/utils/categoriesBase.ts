import { TypeTransactionEnums } from "../enum/typeTransaction";

export const categoriesBase = [
  { name: "Mercado", type: TypeTransactionEnums.Expense },
  { name: "Uber", type: TypeTransactionEnums.Expense },
  { name: "Internet", type: TypeTransactionEnums.Expense },
  { name: "Aluguel", type: TypeTransactionEnums.Expense },
  { name: "Netflix", type: TypeTransactionEnums.Expense },
  { name: "Salário", type: TypeTransactionEnums.Revenue },
  { name: "Freelancer", type: TypeTransactionEnums.Revenue },
  { name: "Investimento em Ações", type: TypeTransactionEnums.Invested },
  { name: "Investimento em CDB", type: TypeTransactionEnums.Invested },
];
