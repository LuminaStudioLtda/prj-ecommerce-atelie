import type { CartItem } from "@/store/use-cart-store";

export const FREE_SHIPPING_THRESHOLD = 350;

export function getItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getFreeShippingRemaining(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}

export function formatItemCount(count: number): string {
  if (count === 0) return "Vazia";
  return count === 1 ? "1 item" : `${count} itens`;
}
