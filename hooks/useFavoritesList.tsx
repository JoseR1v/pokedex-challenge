import { getFavorites } from "@/helpers/favorites";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useMemo, useState } from "react";

export function useFavoritesList() {
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const favs = await getFavorites();
      setList(favs || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
      return undefined;
    }, [refresh])
  );

  useFocusEffect(
    useCallback(() => {
      const sub = navigation.addListener("focus", refresh);
      return () => sub && sub();
    }, [navigation, refresh])
  );

  const set = useMemo(() => new Set(list), [list]);
  return { favorites: set, loading, refresh };
}
