import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    Pressable,
    StyleProp,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Props = {
  children?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
};

const paddingBySize: Record<Size, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-5 py-3.5",
};

const textBySize: Record<Size, string> = {
  sm: "text-[13px]",
  md: "text-[15px]",
  lg: "text-[16px]",
};

function classesFor(variant: Variant, disabled?: boolean) {
  if (disabled)
    return {
      container: "bg-gray-300",
      text: "text-gray-500",
      border: "border-transparent",
      ripple: "rgba(0,0,0,0.05)",
    };

  switch (variant) {
    case "primary":
      return {
        container: "bg-main-blue",
        text: "text-white",
        border: "border-transparent",
        ripple: "rgba(255,255,255,0.2)",
      };
    case "secondary":
      return {
        container: "bg-bright-yellow",
        text: "text-main-blue",
        border: "border-transparent",
        ripple: "rgba(0,0,0,0.08)",
      };
    case "outline":
      return {
        container: "bg-transparent",
        text: "text-main-blue",
        border: "border border-main-blue",
        ripple: "rgba(0,0,0,0.06)",
      };
    case "ghost":
      return {
        container: "bg-transparent",
        text: "text-main-blue",
        border: "border-transparent",
        ripple: "rgba(0,0,0,0.06)",
      };
    case "danger":
      return {
        container: "bg-pinky-red",
        text: "text-white",
        border: "border-transparent",
        ripple: "rgba(255,255,255,0.2)",
      };
  }
}

export default function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  disabled,
  loading,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  textClassName,
  style,
  textStyle,
  accessibilityLabel,
}: Props) {
  const cls = classesFor(variant, disabled);
  const base =
    "rounded-xl flex-row items-center justify-center active:opacity-90 shadow-md";
  const width = fullWidth ? "w-full" : "w-auto";
  const padding = paddingBySize[size];
  const textBase = `font-bold ${textBySize[size]}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={disabled || loading ? undefined : onPress}
      android_ripple={{ color: cls?.ripple }}
      className={[
        base,
        width,
        padding,
        cls?.container,
        cls?.border,
        disabled || loading ? "opacity-80" : "",
        className ?? "",
      ].join(" ")}
      style={style}
    >
      <View className="flex-row items-center gap-2">
        {loading ? (
          <ActivityIndicator color={"#fff"} />
        ) : (
          <>
            {!!leftIcon && <View>{leftIcon}</View>}
            {!!children && (
              <Text
                className={[textBase, cls?.text, textClassName ?? ""].join(" ")}
                style={textStyle}
              >
                {children}
              </Text>
            )}
            {!!rightIcon && <View>{rightIcon}</View>}
          </>
        )}
      </View>
    </Pressable>
  );
}