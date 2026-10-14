import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
};

const EMPTY_PROFILE: UserProfile = { name: "", email: "", phone: "", cep: "", address: "" };

type SessionState = {
  isAuthenticated: boolean;
  hasHydrated: boolean;
  profile: UserProfile;
  login: (identity: Pick<UserProfile, "name" | "email">) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  setHasHydrated: (value: boolean) => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasHydrated: false,
      profile: EMPTY_PROFILE,
      login: ({ name, email }) =>
        set((state) => ({
          isAuthenticated: true,
          profile:
            state.profile.email === email
              ? { ...state.profile, name: name || state.profile.name }
              : { ...EMPTY_PROFILE, name, email },
        })),
      logout: () => set({ isAuthenticated: false }),
      updateProfile: (profile) => set({ profile }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "session-store",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ isAuthenticated, profile }) => ({ isAuthenticated, profile }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
