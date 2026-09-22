import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SessionState = {
  isAuthenticated: boolean;
  hasHydrated: boolean;
  login: () => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasHydrated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "session-store",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
