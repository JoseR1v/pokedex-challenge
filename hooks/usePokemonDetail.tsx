import { pokemonsApi } from "@/core/api/pokemons-api";
import { usePokemonFromCache } from "@/hooks/usePokemonCache";
import type { PokemonInfo } from "@/infrastructure/interfaces/pokemon-info";
import { useQuery } from "@tanstack/react-query";

export function usePokemonDetail(idOrName: string) {
  const cached = usePokemonFromCache(idOrName);

  return useQuery<PokemonInfo>({
    queryKey: ["pokemon", "detail", String(idOrName)],
    initialData: cached
      ? ({
          id: cached.id ?? 0,
          name: cached.name,
          height: cached.height ?? 0,
          weight: cached.weight ?? 0,
          types: (cached.types ?? []).map((t, i) => ({ slot: i + 1, type: { name: t, url: "" } })),
          sprites: {
            front_default: cached.sprites.frontDefault ?? undefined,
            other: {
              dream_world: { front_default: cached.sprites.dreamWorld ?? undefined },
              home: { front_default: cached.sprites.home ?? undefined },
              "official-artwork": { front_default: cached.sprites.officialArtwork ?? undefined },
            },
          },
          abilities: (cached as any)?.abilities?.map((a: any) => ({
            ability: { name: a.name, url: "" },
            is_hidden: a.isHidden,
            slot: a.slot,
          })),
          stats: (cached as any)?.stats?.map((s: any) => ({
            stat: { name: s.name, url: "" },
            percent: s?.percent,
          })),
        } as PokemonInfo)
      : undefined,
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const { data } = await pokemonsApi.get<PokemonInfo>(`/pokemon/${idOrName}`);
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
}