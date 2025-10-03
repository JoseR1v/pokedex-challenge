import ProgressBar from "@/components/ProgressBar";
import { getStatColor } from "@/constants/stats";
import React from "react";
import { Text, View } from "react-native";

type Row = { label: string; percent: number };

export default function StatsSection({ stats }: { stats: Row[] }) {
  if (!stats.length) return <Text>No hay estadísticas disponibles.</Text>;

  const total = stats.reduce((acc, it) => acc + (Number(it.percent) || 0), 0);

  return (
    <View className="mt-4">
      <View className="gap-3">
        {stats.map((s) => (
          <View key={s.label} className="flex-row items-center gap-3">
            <Text className="w-20 text-gray-500 capitalize">{prettyStat(s.label)}</Text>
            <Text className="w-12 text-right font-semibold">{s.percent}%</Text>
            <View className="flex-1">
              <ProgressBar value={s.percent} color={getStatColor(s.label)} height={12} />
            </View>
          </View>
        ))}
        <View className="flex-row items-center gap-3 mt-2">
          <Text className="w-20 text-gray-500">Total</Text>
          <Text className="w-12 text-right font-semibold">{total}</Text>
          <View className="flex-1" />
        </View>
      </View>
    </View>
  );
}

function prettyStat(key: string) {
  switch (key) {
    case "hp": return "HP";
    case "attack": return "Attack";
    case "defense": return "Defense";
    case "special-attack": return "Sp. Atk";
    case "special-defense": return "Sp. Def";
    case "speed": return "Speed";
    default: return key;
  }
}