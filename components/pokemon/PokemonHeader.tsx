import { getTypePillStyle } from "@/constants/colors";
import { useFavoritePokemon } from "@/hooks/useFavoritePokemon";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type Props = {
  name: string;
  id?: number | null;
  topBg: string;
  topBgDark: string;
  types: string[];
  onBack?: () => void;
};

export default function PokemonHeader({ name, id, topBg, topBgDark, types, onBack }: Props) {
  const { isFavorite, toggle, ready } = useFavoritePokemon(name);

  return (
    <View className="relative z-0 h-1/2">
      <LinearGradient colors={[topBg, topBgDark]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <View className="px-4 pt-12">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={onBack} className="p-2 rounded-full bg-white/20">
              <Ionicons name="chevron-back" size={22} color="white" />
            </Pressable>

            <Pressable
              onPress={toggle}
              className="p-2 rounded-full bg-white/20"
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {!ready ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? "#ef4444" : "white"} />
              )}
            </Pressable>
          </View>

          <View className="mt-5">
            <Text className="text-white text-5xl font-extrabold capitalize">{name}</Text>
            <View className="flex-row gap-2 mt-2">
              {types.map((t) => {
                const pill = getTypePillStyle(t);
                return (
                  <View key={t} className="py-1 px-3 rounded-full" style={{ backgroundColor: pill.bg }}>
                    <Text className="font-bold capitalize" style={{ color: pill.text }}>{t}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {!!id && (
            <Text className="absolute right-4 top-24 text-white/30 font-bold text-9xl">#{id}</Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}