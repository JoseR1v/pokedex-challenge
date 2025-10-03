export interface PokemonSpritesSummary {
  dreamWorld: string | null;
  home: string | null;
  officialArtwork: string | null;
  frontDefault: string | null;
}

export interface PokemonStatSummary {
  name: string;
  base: number;
  percent: number;
}

export interface PokemonAbilitySummary {
  name: string;
  isHidden: boolean;
  slot: number;
}

export interface PokemonSummary {
  id: number | null;
  name: string;
  types: string[];
  sprites: PokemonSpritesSummary;
  height: number | null;
  weight: number | null;
  stats?: PokemonStatSummary[];
   abilities?: PokemonAbilitySummary[];
}
