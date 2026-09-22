import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SessionState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "session-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
