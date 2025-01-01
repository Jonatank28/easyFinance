import { api } from "@/config/api";
import { create } from "zustand";

interface TransactionState {
  data: any
  getDataTransactions: (userId: string, month: string, year: string) => void
}

export const useTransactions = create<TransactionState>((set) => ({
  data: {},
  getDataTransactions: async (userId: string, month: string, year: string) => {
    try {
      const res = await api.get(`/transaction/getAllByMonthAndYear/${userId}/${month}/${year}`);
      set({ data: res.data });
    } catch (error) {
      console.log(error);
    }
  }
}));