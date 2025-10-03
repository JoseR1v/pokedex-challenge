import type { PokemonInfo } from "@/infrastructure/interfaces/pokemon-info";

export const norm = (s: string) =>
  s?.normalize?.("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase() ?? s?.toLowerCase();

export const getArtworkFromInfo = (info?: PokemonInfo) =>
  info?.sprites?.other?.["official-artwork"]?.front_default ??
  info?.sprites?.other?.dream_world?.front_default ??
  info?.sprites?.other?.home?.front_default ??
  info?.sprites?.front_default ??
  null;

export const getTypesFromInfo = (info?: PokemonInfo): string[] =>
  info?.types?.map((t) => t.type.name) ?? [];

export const darken = (hex: string, amount = 0.15) => {
  try {
    const n = parseInt(hex.replace("#", ""), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, Math.round(r * (1 - amount))));
    g = Math.max(0, Math.min(255, Math.round(g * (1 - amount))));
    b = Math.max(0, Math.min(255, Math.round(b * (1 - amount))));
    const toHex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch {
    return hex;
  }
};
