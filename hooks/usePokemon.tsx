import { PokemonAction } from "@/core/actions/pokemon/pokemon.action";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 50;

export const usePokemon = () => {
  const PokemonQuery = useInfiniteQuery({
    queryKey: ['pokemons', 'list', { limit: PAGE_SIZE }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return PokemonAction({ page: pageParam, limit: PAGE_SIZE });
    },
    staleTime: 1000 * 60 * 60 * 24,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
  });

  return { PokemonQuery };
};