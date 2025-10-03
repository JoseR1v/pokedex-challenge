import type { PokemonType } from "./types";

export const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  textPrimary: "#1A1A1A",
  textOnPrimary: "#FFFFFF",
  cardShadow: "rgba(0,0,0,0.1)",
  typeFallback: "#48D1B6",
} as const;

export const TYPE_BG: Record<PokemonType, string> = {
  normal:"#BDBDBD", 
  fire:"#FB6C6C", 
  water:"#76BEFE", 
  electric:"#FFD76F", 
  grass:"#48D1B6",
  ice:"#7CDDFB",
  fighting:"#D56723",
  poison:"#A974C4",
  ground:"#E2BF65",
  flying:"#A98FF3",
  psychic:"#F95587",
  bug:"#A8E063",
  rock:"#C5B78C",
  ghost:"#7B62A3",
  dragon:"#6F35FC",
  dark:"#705746",
  steel:"#B7B7CE",
  fairy:"#F4BDC9",
};

export const TYPE_PILL: Record<PokemonType, { bg: string; text: string }> = Object.fromEntries(
  (Object.keys(TYPE_BG) as PokemonType[]).map((k) => [k, { bg: "rgba(255,255,255,0.25)", text: COLORS.white }])
) as Record<PokemonType, { bg: string; text: string }>;

export const getTypeBg = (type?: string) =>
  (type && TYPE_BG[type as PokemonType]) || COLORS.typeFallback;

export const getCardBgFromTypes = (types: string[]) => getTypeBg(types?.[0]);

export const getTypePillStyle = (type?: string) =>
  (type && TYPE_PILL[type as PokemonType]) || { bg: "rgba(255,255,255,0.25)", text: COLORS.white };

export const getReadableText = (bgHex: string) => {
  const hex = bgHex.replace('#', '');
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
  return lum > 0.6 ? COLORS.textPrimary : COLORS.textOnPrimary;
};

export const getTypeChipColors = (type?: string) => {
  const bg = getTypeBg(type);
  return { bg, text: getReadableText(bg) };
};