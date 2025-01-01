import { TypeTransactionEnums } from "../enum/typeTransaction";

interface CategoriesBaseTypes {
  name: string;
  type: TypeTransactionEnums;
  icon: string;
}

export const categoriesBase: CategoriesBaseTypes[] = [
  { name: "Mercado", type: TypeTransactionEnums.Expense, icon: "Store" },
  { name: "Uber", type: TypeTransactionEnums.Expense, icon: "Car" },
  { name: "Internet", type: TypeTransactionEnums.Expense, icon: "Globe" },
  { name: "Aluguel", type: TypeTransactionEnums.Expense, icon: "Home" },
  { name: "Netflix", type: TypeTransactionEnums.Expense, icon: "Clapperboard" },
  { name: "Salário", type: TypeTransactionEnums.Revenue, icon: "Banknote" },
  { name: "Freelancer", type: TypeTransactionEnums.Revenue, icon: "HandCoins" },
  {
    name: "Investimento em Ações",
    type: TypeTransactionEnums.Invested,
    icon: "Activity",
  },
  {
    name: "Investimento em CDB",
    type: TypeTransactionEnums.Invested,
    icon: "Activity",
  },
];
