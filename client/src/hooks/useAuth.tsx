import { api } from "@/config/api";
import { UserCreateTypes } from "@/types/user";
import { create } from "zustand"

interface AuthState {
  user?: UserCreateTypes
  setUser: (user: UserCreateTypes) => void
  createUser: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: undefined,
  setUser: (user: UserCreateTypes) => set({ user }),
  createUser: async () => {
    const user = get().user
    try {
      await api.post('/user/create', user)
    } catch (error) {
      console.log(error)
    }
  }
}))
