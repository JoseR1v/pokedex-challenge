import { usePokemon } from "@/hooks/usePokemon";
import type { PokemonSummary } from "@/infrastructure/interfaces/pokemon-summary";
import { norm } from "@/utils/pokemon";
import { useMemo } from "react";

export function usePokemonFromCache(idOrName: string) {
  const { PokemonQuery } = usePokemon();
  const key = useMemo(() => norm(String(idOrName)), [idOrName]);

  return useMemo<PokemonSummary | undefined>(() => {
    const pages = PokemonQuery.data?.pages as PokemonSummary[][] | undefined;
    if (!pages) return undefined;
    const isNumeric = /^\d+$/.test(String(idOrName));
    for (const page of pages) {
      for (const p of page) {
        if (isNumeric && p.id != null && String(p.id) === String(idOrName)) return p;
        if (!isNumeric && norm(p.name) === key) return p;
      }
    }
    return undefined;
  }, [PokemonQuery.data, idOrName, key]);
}
