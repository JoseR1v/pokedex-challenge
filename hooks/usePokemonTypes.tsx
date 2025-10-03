import { pokemonsApi } from "@/core/api/pokemons-api";
import { useQuery } from "@tanstack/react-query";

type PokeTypeAPI = {
  results: { name: string; url: string }[];
};

export function usePokemonTypes() {
  return useQuery({
    queryKey: ["pokemon", "types"],
    queryFn: async () => {
      const { data } = await pokemonsApi.get<PokeTypeAPI>("/type");
      const blacklist = new Set(["unknown", "shadow"]);
      return data.results
        .map((t) => t.name)
        .filter((n) => !blacklist.has(n))
        .sort((a, b) => a.localeCompare(b));
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
}
