import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  price: number;
  href?: string;
  image?: string;
  tone?: string;
  size?: string;
  quantity: number;
};

export type CartItemInput = Omit<CartItem, "key" | "quantity">;

const MAX_ITEM_QUANTITY = 99;

export function buildCartKey({ productId, tone, size }: CartItemInput): string {
  return [productId, tone ?? "", size ?? ""].join("|");
}

function clampQuantity(quantity: number): number {
  return Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.floor(quantity)));
}

type CartState = {
  items: CartItem[];
  addItem: (input: CartItemInput, quantity: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (input, quantity) =>
        set((state) => {
          const key = buildCartKey(input);
          const existing = state.items.find((item) => item.key === key);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { ...input, key, quantity: clampQuantity(quantity) }] };
        }),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, quantity: clampQuantity(quantity) } : item,
          ),
        })),
      removeItem: (key) => set((state) => ({ items: state.items.filter((item) => item.key !== key) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
