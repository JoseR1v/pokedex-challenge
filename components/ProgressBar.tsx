import React, { memo } from "react";
import { Text, View } from "react-native";

type Props = {
  value: number;
  label?: string;
  showValue?: boolean;
  height?: number;
  color?: string;
  trackColor?: string;
  radius?: number;
};

function ProgressBarInner({
  value,
  label,
  showValue = true,
  height = 10,
  color = "#22c55e",
  trackColor = "#E5E7EB",
  radius = 999,
}: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <View style={{ gap: 6 }}>
      {label ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "600", textTransform: "capitalize" }}>{label}</Text>
          {showValue ? <Text style={{ fontVariant: ["tabular-nums"] }}>{pct}%</Text> : null}
        </View>
      ) : null}
      <View
        style={{
          height,
          backgroundColor: trackColor,
          borderRadius: radius,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}

export default memo(ProgressBarInner);