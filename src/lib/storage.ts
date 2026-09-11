import { useCallback, useEffect, useState } from 'react';

const PREFIX = 'hainan-trip-v1:';

export function usePersistentState<T>(key: string, initial: T): [T, (next: T) => void, () => void] {
  const storageKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return initial;
      const parsed = JSON.parse(raw) as T;
      // Merge objects so new assumption keys added later keep their defaults.
      if (
        parsed &&
        typeof parsed === 'object' &&
        !Array.isArray(parsed) &&
        initial &&
        typeof initial === 'object' &&
        !Array.isArray(initial)
      ) {
        return { ...(initial as object), ...(parsed as object) } as T;
      }
      return parsed;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode) — keep working in memory */
    }
  }, [storageKey, value]);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setValue(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  return [value, setValue, reset];
}
