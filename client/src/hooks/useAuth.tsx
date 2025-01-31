import { api } from "@/config/api";
import { create } from "zustand"
// import { UserCreateTypes } from "../types/user";

export interface UserCreateTypes {
  userId: string;
  name: string;
  email: string;
  photo: string;
}

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
