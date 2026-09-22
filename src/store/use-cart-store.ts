import { create } from "zustand";

type CartState = {
  itemCount: number;
  addItems: (quantity: number) => void;
};

export const useCartStore = create<CartState>()((set) => ({
  itemCount: 0,
  addItems: (quantity) => set((state) => ({ itemCount: state.itemCount + quantity })),
}));
