const { create } = require("zustand");
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      users: [],
      user: null,

      registerUser: (newUser) =>
        set((state) => ({
          users: [...state.users, newUser],
        })),

      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-user",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);

export default useAuthStore;
