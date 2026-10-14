import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** `false` no servidor e na hidratação; `true` depois, evitando mismatch com stores persistidas. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
