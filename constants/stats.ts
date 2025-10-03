export const MAX_BASE_STAT = 100;

export const toPercent = (base: number) =>
  Math.max(0, Math.min(100, Math.round((base / MAX_BASE_STAT) * 100)));

export type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export const STAT_COLORS: Record<StatName, string> = {
  hp: "#ef4444",
  attack: "#f59e0b",
  defense: "#3b82f6",
  "special-attack": "#a855f7",
  "special-defense": "#10b981",
  speed: "#06b6d4",
};

export const getStatColor = (name: string) =>
  (STAT_COLORS as Record<string, string>)[name] ?? "#22c55e";
