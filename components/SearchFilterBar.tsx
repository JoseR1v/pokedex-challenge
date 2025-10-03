import { COLORS, getTypeBg, getTypeChipColors } from "@/constants/colors";
import React, { memo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Input from "./ui/Input";

type Props = {
  search: string;
  onChangeSearch: (v: string) => void;
  types: string[];
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  solidChips?: boolean;
};

const Chip = ({
  label,
  active,
  onPress,
  solid = true,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  solid?: boolean;
}) => {
  const isAll = label === "Todos";
  const baseBg = isAll ? "#9CA3AF" : getTypeBg(label);
  const { bg, text } = getTypeChipColors(isAll ? "normal" : label);

  const backgroundColor = active ? (solid ? bg : baseBg) : "white";
  const borderColor = baseBg;
  const textColor = active ? (solid ? text : COLORS.textOnPrimary) : "#111827";

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginRight: 8,
        borderWidth: 1,
        borderColor,
        backgroundColor,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontWeight: "600",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

function SearchFilterBarInner({
  search,
  onChangeSearch,
  types,
  selectedType,
  onSelectType,
  solidChips = true,
}: Props) {
  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 8, gap: 10 }}>

      <Input
          label=""
          placeholder="Busca pokémon por nombre..."
          value={search}
          onChangeText={onChangeSearch}
          containerStyle={{ marginVertical: 16, width: "100%" }}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 4 }}>
        <Chip
          label="Todos"
          active={selectedType === null}
          onPress={() => onSelectType(null)}
          solid={solidChips}
        />
        {types.map((t) => (
          <Chip
            key={t}
            label={t}
            active={selectedType === t}
            onPress={() => onSelectType(t)}
            solid={solidChips}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default memo(SearchFilterBarInner);