import React, { JSX, memo, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

export type InfiniteListProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;

  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  onEndReachedThreshold?: number;

  refreshing?: boolean;
  onRefresh?: () => void;

  numColumns?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  columnWrapperStyle?: StyleProp<ViewStyle>;
  itemSeparatorHeight?: number;

  ListEmptyComponent?: React.ReactElement | null;
  ListHeaderComponent?: React.ReactElement | null;

  initialNumToRender?: number;
  windowSize?: number;
  maxToRenderPerBatch?: number;
  showsVerticalScrollIndicator?: boolean;
  removeClippedSubviews?: boolean;

  /** Nuevo: rellena la última fila con “spacers” invisibles para mantener siempre 2 columnas */
  padIncompleteRows?: boolean;
};

function ListInner<T>({
  data,
  renderItem,
  keyExtractor,

  hasNextPage = false,
  fetchNextPage,
  isFetchingNextPage = false,
  onEndReachedThreshold = 0.5,

  refreshing = false,
  onRefresh,

  numColumns = 1,
  contentContainerStyle,
  columnWrapperStyle,
  itemSeparatorHeight = 0,

  ListEmptyComponent = null,
  ListHeaderComponent = null,

  initialNumToRender = 10,
  windowSize = 7,
  maxToRenderPerBatch = 10,
  showsVerticalScrollIndicator = false,
  removeClippedSubviews = true,

  padIncompleteRows = true,
}: InfiniteListProps<T>) {
  const dataWithSpacers = useMemo(() => {
    if (!padIncompleteRows || numColumns <= 1) return data;
    const remainder = data.length % numColumns;
    if (remainder === 0) return data;

    const fillersCount = numColumns - remainder;
    const spacers = Array.from({ length: fillersCount }, (_, i) => ({
      __spacer: true,
      __key: `__spacer-${i}`,
    })) as unknown as T[];

    return [...data, ...spacers];
  }, [data, numColumns, padIncompleteRows]);

  const internalKeyExtractor = useCallback(
    (item: any, index: number) =>
      item?.__spacer ? `__spacer-${index}` : keyExtractor(item, index),
    [keyExtractor]
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const internalRenderItem: ListRenderItem<any> = useCallback(
    (args) => {
      const { item } = args;
      if (item?.__spacer) {
        return <View style={{ flex: 1, opacity: 0 }} pointerEvents="none" />;
      }
      return renderItem(args as any);
    },
    [renderItem]
  );

  return (
    <FlatList
      data={dataWithSpacers}
      renderItem={internalRenderItem}
      keyExtractor={internalKeyExtractor}
      numColumns={numColumns}
      contentContainerStyle={contentContainerStyle}
      columnWrapperStyle={numColumns > 1 ? columnWrapperStyle : undefined}
      ItemSeparatorComponent={
        itemSeparatorHeight
          ? () => <View style={{ height: itemSeparatorHeight }} />
          : undefined
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={handleEndReached}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{ paddingVertical: 12 }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      removeClippedSubviews={removeClippedSubviews}
      initialNumToRender={initialNumToRender}
      windowSize={windowSize}
      maxToRenderPerBatch={maxToRenderPerBatch}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
}

const List = memo(ListInner) as <T>(p: InfiniteListProps<T>) => JSX.Element;
export default List;