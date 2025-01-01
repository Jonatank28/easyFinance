export type Payment = {
  id: string;
  description: string;
  type: "expense" | "revenue" | "investment";
  category: string;
  value: number;
  date: string;
};
