import EmptyState from "@/components/EmpyState";
import HomeHeader from "@/components/home/HomeHeader";
import List from "@/components/List";
import Loader from "@/components/Loader";
import PokemonCard from "@/components/pokemon/PokemonCard";
import SearchFilterBar from "@/components/SearchFilterBar";
import { clearAll, getUserName } from "@/helpers";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useFavoritesList } from "@/hooks/useFavoritesList";
import { usePokemon } from "@/hooks/usePokemon";
import { usePokemonTypes } from "@/hooks/usePokemonTypes";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SpritePack = {
  officialArtwork?: string | null;
  frontDefault?: string | null;
  dreamWorld?: string | null;
};

type Row = {
  id?: number | null;
  name: string;
  types: string[];
  sprites: SpritePack;
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { PokemonQuery } = usePokemon();
  const { data: types = [] } = usePokemonTypes();
  const { favorites } = useFavoritesList();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
    error,
  } = PokemonQuery;

  const [name, setName] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    (async () => setName(await getUserName()))();
  }, []);

  const onLogout = useCallback(async () => {
    await clearAll();
    router.replace("/login");
  }, []);

  const items: Row[] = useMemo(() => {
    return data?.pages.flatMap((p: Row[]) => p) ?? [];
  }, [data]);

  const norm = (s: string) =>
    s.normalize?.("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase() ?? s.toLowerCase();
  const term = norm(debouncedSearch);

  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      const matchesSearch = term ? norm(it.name).includes(term) : true;
      const matchesType = selectedType ? it.types?.includes(selectedType) : true;
      return matchesSearch && matchesType;
    });
  }, [items, term, selectedType]);

  const isFiltering = !!term || !!selectedType;

  const keyExtractor = useCallback(
    (item: Row, index: number) => String(item.id ?? item.name ?? index),
    []
  );

  const renderItem = useCallback(({ item }: { item: Row }) => {
    const fav = favorites.has(item.name.toLowerCase());
    return (
      <View style={{ flex: 1 }}>
        <PokemonCard
          name={item.name}
          types={item.types}
          sprites={item.sprites}
          isFavorite={fav}
          onPress={() => router.push(`/pokemon/${item.id}`)}
        />
      </View>
    );
  }, [favorites, router]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, gap: 16 }}>
      <Loader visible={isLoading} message="Cargando Pokémons..." />

      <HomeHeader name={name} height={210}>
        <SearchFilterBar
          search={search}
          onChangeSearch={setSearch}
          types={types}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          solidChips
        />
      </HomeHeader>


      {error ? (
        <View className="w-full px-4 mb-2">
          <Text className="text-sm text-red-500">
            Ocurrió un error al cargar. {String((error as any)?.message ?? "")}
          </Text>
        </View>
      ) : null}

      <List<Row>
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        hasNextPage={!!hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={!!isFetchingNextPage}
        onEndReachedThreshold={0.5}
        refreshing={!!isRefetching}
        onRefresh={onRefresh}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12 }}
        itemSeparatorHeight={12}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              title={isFiltering ? "Sin resultados" : "Nada por aquí"}
              subtitle={
                isFiltering
                  ? "Intenta con otra búsqueda o quita los filtros."
                  : "Todavía no hay pokémon para mostrar."
              }
              imageSource={require("@/assets/images/pokeball.png")}
              actionLabel={isFiltering ? "Limpiar filtros" : undefined}
              onAction={isFiltering ? () => { setSearch(""); setSelectedType(null); } : undefined}
              compact
            />
          ) : null
        }
        initialNumToRender={10}
        windowSize={7}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />
    </View>
  );
}