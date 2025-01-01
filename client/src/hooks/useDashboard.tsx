import { api } from "@/config/api";
import { create } from "zustand";
import { useAuth } from "./useAuth";
import { LastTransaction, PercentageType, SpendingCategory, ValuesInformation } from "@/types/dashboard";

interface DashboardState {
  data: {
    existUser: boolean
    lastTransactions: LastTransaction[];
    spendingCategory: SpendingCategory[];
    valuesInformation: ValuesInformation;
    percentageType: PercentageType[];
  };
  getDataDashboard: (userId: string, month: string, year: string) => void;
}

const useDashboard = create<DashboardState>((set) => ({
  data: {
    existUser: false,
    lastTransactions: []
    , spendingCategory: []
    , valuesInformation: { revenue: '', expense: '', investment: '', balance: '' }
    , percentageType: []
  },
  getDataDashboard: async (userId: string, month: string, year: string) => {
    const { createUser } = useAuth.getState()
    try {
      const res = await api.get(`/dashboard/getDashboardData/${userId}/${month}/${year}`);
      set({ data: res.data })
      if (!res.data.existUser) {
        await createUser()
      }
    } catch (error) {
      console.log(error)
    }
  }
}));

export default useDashboard;