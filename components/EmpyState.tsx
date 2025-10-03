import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

type Props = {
  title?: string;
  subtitle?: string;
  imageSource?: any;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconSize?: number;
  iconColor?: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

export default function EmptyState({
  title = "Sin resultados",
  subtitle = "No pudimos encontrar elementos con los criterios actuales.",
  imageSource,
  iconName = "search-outline",
  iconSize = 48,
  iconColor = "#9CA3AF",
  actionLabel,
  onAction,
  compact = false,
  containerStyle,
  titleStyle,
  subtitleStyle,
}: Props) {
  return (
    <View
      className="items-center justify-center"
      style={[
        { paddingVertical: compact ? 16 : 32, paddingHorizontal: 16 },
        containerStyle,
      ]}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={{ width: compact ? 96 : 140, height: compact ? 96 : 140, opacity: 0.9 }}
          contentFit="contain"
          accessibilityLabel="Empty illustration"
        />
      ) : (
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      )}

      <Text
        className="text-center font-extrabold text-gray-800 mt-4"
        style={[{ fontSize: compact ? 16 : 18 }, titleStyle]}
      >
        {title}
      </Text>
      {!!subtitle && (
        <Text
          className="text-center text-gray-500 mt-1"
          style={[{ fontSize: compact ? 12 : 14, lineHeight: 20 }, subtitleStyle]}
        >
          {subtitle}
        </Text>
      )}

      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          className="mt-4 px-4 py-2 rounded-xl bg-gray-100"
          android_ripple={{ color: "rgba(0,0,0,0.08)" }}
        >
          <Text className="text-gray-800 font-semibold">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}