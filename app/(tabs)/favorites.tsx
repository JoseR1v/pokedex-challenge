import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EmptyState from "@/components/EmpyState";
import FavoritesHeaderDribbble from "@/components/home/FavoritesHeaders";
import List from "@/components/List";
import PokemonCard from "@/components/pokemon/PokemonCard";

import { useFavoritesList } from "@/hooks/useFavoritesList";
import { usePokemon } from "@/hooks/usePokemon";

type SpritePack = {
  officialArtwork?: string | null;
  frontDefault?: string | null;
  dreamWorld?: string | null;
};
type Row = { id?: number | null; name: string; types: string[]; sprites: SpritePack };

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { PokemonQuery } = usePokemon();
  const { favorites, refresh } = useFavoritesList();

  const itemsAll: Row[] = useMemo(() => {
    const pages = (PokemonQuery.data?.pages ?? []) as Row[][];
    return pages.flat();
  }, [PokemonQuery.data]);

  const favItems: Row[] = useMemo(() => {
    if (!itemsAll.length || favorites.size === 0) return [];
    return itemsAll.filter((it) => favorites.has(String(it.name).toLowerCase()));
  }, [itemsAll, favorites]);

  const renderItem = useCallback(({ item }: { item: Row }) => {
    return (
      <View style={{ flex: 1 }}>
        <PokemonCard
          name={item.name}
          types={item.types}
          sprites={item.sprites}
          isFavorite={true}
          onPress={() => router.push(`/pokemon/${item.id}`)}
        />
      </View>
    );
  }, []);

  const keyExtractor = useCallback(
    (item: Row, index: number) => String(item.id ?? item.name ?? index),
    []
  );

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <FavoritesHeaderDribbble count={favItems.length} height={130} />

      {favorites.size === 0 ? (
        <EmptyState
          title="Aún no tienes favoritos"
          subtitle="Toca el corazón en un Pokémon para guardarlo aquí."
          imageSource={require("@/assets/images/pokeball.png")}
          actionLabel="Actualizar"
          onAction={refresh}
        />
      ) : favItems.length === 0 ? (
        <EmptyState
          title="No pudimos cargar tus favoritos"
          subtitle="Intenta actualizar la pantalla."
          iconName="refresh-outline"
          actionLabel="Actualizar"
          onAction={refresh}
        />
      ) : (
        <List<Row>
          data={favItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          hasNextPage={false}
          fetchNextPage={() => {}}
          isFetchingNextPage={false}
          onEndReachedThreshold={0}
          refreshing={!!PokemonQuery.isRefetching}
          onRefresh={() => {
            refresh();
            PokemonQuery.refetch?.();
          }}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, paddingTop: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          itemSeparatorHeight={12}
          initialNumToRender={10}
          windowSize={7}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      )}
    </View>
  );
}
