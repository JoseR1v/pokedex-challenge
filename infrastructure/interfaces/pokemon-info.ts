export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface SpriteOther {
  dream_world?: { front_default?: string | null };
  home?: { front_default?: string | null };
  ["official-artwork"]?: { front_default?: string | null };
}

export interface SpriteInfo {
  front_default?: string | null;
  other?: SpriteOther;
}

export interface TypeInfo {
  slot: number;
  type: NamedAPIResource;
}

export interface StatInfo {
  base_stat: number;
  stat: NamedAPIResource;
}

export interface AbilityInfo {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonInfo {
  height: number;
  id: number;
  name: string;
  sprites: SpriteInfo;
  types: TypeInfo[];
  weight: number;
  stats?: StatInfo[];
  abilities?: AbilityInfo[];
}