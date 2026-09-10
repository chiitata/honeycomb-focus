"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "hcf-local-storage";

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * localStorage-backed state built on `useSyncExternalStore` so it stays in
 * sync across tabs (via the native `storage` event) and within the same tab
 * (via a custom event dispatched on write). Using the external-store API also
 * avoids hydration mismatches: the server/initial snapshot is `null`, and
 * React re-renders with the client value right after hydration.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const onCustom = (e: Event) => {
        if (e instanceof CustomEvent && e.detail !== key) return;
        onChange();
      };
      window.addEventListener(EVENT, onCustom);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener(EVENT, onCustom);
        window.removeEventListener("storage", onChange);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => readRaw(key), [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);

  let value: T = initial;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = initial;
    }
  }

  const setValue = useCallback(
    (update: T | ((prev: T) => T)) => {
      const currentRaw = readRaw(key);
      let prev: T = initial;
      if (currentRaw !== null) {
        try {
          prev = JSON.parse(currentRaw) as T;
        } catch {
          prev = initial;
        }
      }
      const next =
        typeof update === "function"
          ? (update as (p: T) => T)(prev)
          : update;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // storage full or unavailable — ignore
      }
      window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
    },
    [key, initial],
  );

  return [value, setValue] as const;
}
