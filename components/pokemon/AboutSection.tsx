import React from "react";
import { Text, View } from "react-native";

export default function AboutSection({
  name,
  height,
  weight,
  abilities,
}: {
  name: string;
  height?: number | null;
  weight?: number | null;
  abilities: { name: string }[];
}) {
  const rows = [
    { label: "Species", value: name },
    { label: "Height", value: height ? `${height / 10} m` : "—" },
    { label: "Weight", value: weight ? `${weight / 10} kg` : "—" },
    { label: "Abilities", value: abilities.length ? abilities.map((a) => a.name).join(", ") : "—" },
  ];

  return (
    <View className="mt-4">
      <View className="mt-2">
        {rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-start justify-between py-2">
      <Text className="text-gray-500">{label}</Text>
      <Text className="text-gray-900 font-semibold max-w-[60%] text-right capitalize">
        {value}
      </Text>
    </View>
  );
}