import { api } from "@/config/api";
import { TransactionTypeTypes } from "@/types/transactionType";
import { create } from "zustand";

// Tipo para as transações individuais (lastTransactions)
interface LastTransaction {
  id: string;
  description: string;
  type: TransactionTypeTypes;
  date: string; // Considerando que a data é uma string no formato 'YYYY-MM-DD HH:mm'
  value: number;
}

// Tipo para a categoria de gastos (spendingCategory)
interface SpendingCategory {
  id: string;
  name: string;
  total: number;
  percentage: string;
}

// Tipo para as informações gerais de valores (valuesInformation)
interface ValuesInformation {
  revenue: string;
  expense: string;
  investment: string;
  balance: string;
}

// Tipo para os tipos de porcentagem (percentageType)
interface PercentageType {
  type: 'revenue' | 'expense' | 'investment';
  value: string;
  percentage: string;
}


interface DashboardState {
  data: {
    lastTransactions: LastTransaction[];
    spendingCategory: SpendingCategory[];
    valuesInformation: ValuesInformation;
    percentageType: PercentageType[];
  };
  getData: (userId: string, month: string, year: string) => void;
}

const useDashboard = create<DashboardState>((set) => ({
  data: {
    lastTransactions: []
    , spendingCategory: []
    , valuesInformation: { revenue: '', expense: '', investment: '', balance: '' }
    , percentageType: []
  },
  getData: async (userId: string, month: string, year: string) => {
    try {
      const res = await api.get(`/dashboard/getDashboardData/${userId}/${month}/${year}`);
      set({ data: res.data })
    } catch (error) {
      console.log(error)
    }
  }
}));

export default useDashboard;