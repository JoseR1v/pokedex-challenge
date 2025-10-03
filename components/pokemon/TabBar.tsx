import React from "react";
import { Pressable, Text, View } from "react-native";

type TabKey = "about" | "stats";
type Props = {
  value: TabKey;
  onChange: (t: TabKey) => void;
};

export default function TabBar({ value, onChange }: Props) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "about", label: "About" },
    { key: "stats", label: "Base Stats" },
  ];

  return (
    <View className="flex-row items-center justify-between px-1">
      {tabs.map((t) => {
        const active = value === t.key;
        return (
          <Pressable
            key={t.key}
            onPress={() => onChange(t.key)}
            className="flex-1 items-center py-3"
          >
            <Text className={`text-sm ${active ? "font-bold text-gray-900" : "text-gray-400"}`}>
              {t.label}
            </Text>
            <View className={`h-[2px] w-full mt-2 ${active ? "bg-gray-900" : "bg-gray-200"}`} />
          </Pressable>
        );
      })}
    </View>
  );
}