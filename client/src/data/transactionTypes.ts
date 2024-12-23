export type TransactionType = {
  key: string;
  label: string;
};

export const transactionTypes: TransactionType[] = [
  {
    key: "expense",
    label: "Despesa",
  },
  {
    key: "revenue",
    label: "Receita",
  },
  {
    key: "investment",
    label: "Investimento",
  },
];
