import { toPercent } from "@/constants/stats";
import type { PokemonInfo } from "@/infrastructure/interfaces/pokemon-info";
import type {
  PokemonAbilitySummary,
  PokemonSpritesSummary,
  PokemonStatSummary,
  PokemonSummary,
} from "@/infrastructure/interfaces/pokemon-summary";

function pickSprites(s: PokemonInfo["sprites"]): PokemonSpritesSummary {
  const dreamWorld = s?.other?.dream_world?.front_default ?? null;
  const home = s?.other?.home?.front_default ?? null;
  const officialArtwork = s?.other?.["official-artwork"]?.front_default ?? null;
  const frontDefault = s?.front_default ?? null;
  return { dreamWorld, home, officialArtwork, frontDefault };
}

function pickStats(info: PokemonInfo): PokemonStatSummary[] {
  if (!info.stats?.length) return [];
  return info.stats.map((s) => ({
    name: s.stat.name,
    base: s.base_stat,
    percent: toPercent(s.base_stat),
  }));
}

function pickAbilities(info: PokemonInfo): PokemonAbilitySummary[] {
  if (!info.abilities?.length) return [];
  return info.abilities
    .slice()
    .sort((a, b) => a.slot - b.slot)
    .map((a) => ({
      name: a.ability.name,
      isHidden: !!a.is_hidden,
      slot: a.slot,
    }));
}

export function mapPokemonInfoToSummary(info: PokemonInfo): PokemonSummary {
  return {
    id: info.id ?? null,
    name: info.name,
    types: info.types?.map((t) => t.type.name) ?? [],
    sprites: pickSprites(info.sprites),
    height: info.height ?? null,
    weight: info.weight ?? null,
    stats: pickStats(info),
    abilities: pickAbilities(info),
  };
}

export function mapFallbackSummary(name: string): PokemonSummary {
  return {
    id: null,
    name,
    types: [],
    sprites: { dreamWorld: null, home: null, officialArtwork: null, frontDefault: null },
    height: null,
    weight: null,
    stats: [],
    abilities: [],
  };
}