import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import AboutSection from "@/components/pokemon/AboutSection";
import PokemonHeader from "@/components/pokemon/PokemonHeader";
import StatsSection from "@/components/pokemon/StatsSection";
import TabBar from "@/components/pokemon/TabBar";

import { getCardBgFromTypes } from "@/constants/colors";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { darken, getArtworkFromInfo, getTypesFromInfo } from "@/utils/pokemon";

export default function PokemonDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const idOrName = String(params.id ?? "").trim();

  const { data, isLoading, isFetching, isError, error } = usePokemonDetail(idOrName);
  const [tab, setTab] = useState<"about" | "stats">("about");

  if (!idOrName) {
    return (
      <View className="flex-1 justify-center p-4">
        <Text className="text-center">No se proporcionó un id o nombre válido.</Text>
      </View>
    );
  }
  if (isLoading && !data) {
    return <View className="flex-1 justify-center"><ActivityIndicator /></View>;
  }
  if (isError && !data) {
    return (
      <View className="flex-1 justify-center p-4">
        <Text className="text-center text-red-500">
          Error al cargar: {String((error as any)?.message ?? "desconocido")}
        </Text>
      </View>
    );
  }

  const name = data?.name ?? idOrName;
  const types = getTypesFromInfo(data);
  const topBg = getCardBgFromTypes(types);
  const topBgDark = darken(topBg, 0.18);
  const artwork = getArtworkFromInfo(data);

  const statRows =
    (data?.stats ?? []).map((s: any) => ({
      label: s?.stat?.name ?? s?.name ?? "stat",
      percent: Math.max(0, Math.min(100, Number(s?.percent ?? 0))),
    })) ?? [];

  const abilityRows =
    data?.abilities
      ?.map((a) => ({ name: a.ability.name, isHidden: a.is_hidden, slot: a.slot }))
      .sort((a, b) => a.slot - b.slot) ?? [];

  return (
    <View className="relative flex-1 bg-white">
      <PokemonHeader
        name={name}
        id={data?.id}
        topBg={topBg}
        topBgDark={topBgDark}
        types={types}
        onBack={() => router.back()}
      />

      {artwork ? (
        <View className="absolute inset-x-0 z-30 items-center" style={{ top: 160 }} pointerEvents="none">
          <Image source={{ uri: artwork }} style={{ width: 280, height: 280 }} contentFit="contain" />
        </View>
      ) : null}

      <ScrollView className="relative z-20 -mt-10" contentContainerClassName="pb-12">
        <View className="mx-4 rounded-3xl bg-white p-4 pb-10 shadow"
          style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, elevation: 8 }}>
          <TabBar value={tab} onChange={setTab} />

          {tab === "about" && (
            <AboutSection
              name={name}
              height={data?.height}
              weight={data?.weight}
              abilities={abilityRows}
            />
          )}

          {tab === "stats" && <StatsSection stats={statRows} />}

          {isFetching ? <View className="mt-4"><ActivityIndicator /></View> : null}
        </View>
      </ScrollView>
    </View>
  );
}
