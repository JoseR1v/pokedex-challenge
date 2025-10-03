import { isFavorite, setFavorite, toggleFavorite } from "@/helpers/favorites";
import { useCallback, useEffect, useState } from "react";

export function useFavoritePokemon(name?: string | null) {
  const key = (name ?? "").toLowerCase();
  const [ready, setReady] = useState(false);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!key) return;
    (async () => {
      const v = await isFavorite(key);
      if (mounted) {
        setFav(v);
        setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [key]);

  const toggle = useCallback(async () => {
    if (!key) return false;
    const next = await toggleFavorite(key);
    setFav(next);
    return next;
  }, [key]);

  const set = useCallback(async (value: boolean) => {
    if (!key) return;
    await setFavorite(key, value);
    setFav(value);
  }, [key]);

  return { isFavorite: fav, toggle, set, ready };
}