import { pokemonsApi } from "@/core/api/pokemons-api";
import type { PokemonInfo } from "@/infrastructure/interfaces/pokemon-info";
import type { PokemonSummary } from "@/infrastructure/interfaces/pokemon-summary";
import type { PokemonsResponse } from "@/infrastructure/interfaces/pokemons-response";
import { mapFallbackSummary, mapPokemonInfoToSummary } from "@/infrastructure/mappers/pokemon-detail.mapper";

interface Options {
  page?: number;
  limit?: number;
}

export const PokemonAction = async ({ page = 1, limit = 50 }: Options = {}): Promise<PokemonSummary[]> => {
  try {
    const offset = (page - 1) * limit;

    const { data } = await pokemonsApi.get<PokemonsResponse>("/pokemon", {
      params: { offset, limit },
    });

    const results = await Promise.all(
      data.results.map(async (p) => {
        try {
          const { data: details } = await pokemonsApi.get<PokemonInfo>(p.url);
          return mapPokemonInfoToSummary(details);
        } catch {
          return mapFallbackSummary(p.name);
        }
      })
    );

    return results;
  } catch (error) {
    console.error("Cannot load pokemons:", error);
    throw new Error("Cannot load pokemons");
  }
};