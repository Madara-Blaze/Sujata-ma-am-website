"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "sidenote:favorites";

/** Per-browser saved-tutor list, persisted to localStorage. No backend yet —
 * this is an interface-first feature, same as the rest of the app. */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      setIds(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setIds([]);
    } finally {
      setReady(true);
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // ignore (private browsing, storage disabled, etc.)
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, ready, toggle, isFavorite };
}
