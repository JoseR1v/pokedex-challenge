import { getTypeBg } from "@/constants/colors";
import { capitalize } from "@/helpers/strings";
import { Ionicons } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SvgUri } from "react-native-svg";

type SpritesObj = {
  officialArtwork?: string | null;
  dreamWorld?: string | null;
  frontDefault?: string | null;
};

type Props = {
  name: string;
  types: string[];
  sprites?: SpritesObj;
  imageUrl?: string | null;
  onPress?: (e: GestureResponderEvent) => void;
  isFavorite?: boolean;
};

export default function PokemonCard({
  name,
  types,
  sprites,
  imageUrl,
  onPress,
  isFavorite = false,
}: Props) {
  const bg = getTypeBg(types?.[0]);

  const preferred =
    imageUrl ?? sprites?.officialArtwork ?? sprites?.frontDefault ?? sprites?.dreamWorld ?? null;
  const isSvg = typeof preferred === "string" && preferred.endsWith(".svg");

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(0,0,0,0.08)" }}
      hitSlop={8}
      pressRetentionOffset={8}
    >
      {({ pressed }) => (
        <View style={[styles.card, { backgroundColor: bg, opacity: pressed ? 0.6 : 1 }]}>
          {isFavorite && (
            <View style={styles.heartBadge} pointerEvents="none">
                <Ionicons
                  name={"heart-outline"}
                  size={18}
                  color={"#ffffff"}
                />
            </View>
          )}

          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {capitalize(name)}
            </Text>

            <View style={styles.pillsColumn}>
              {types?.slice(0, 2).map((t) => (
                <View key={t} style={styles.pill}>
                  <Text style={styles.pillText}>{capitalize(t)}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.imageWrap}>
            {!!preferred &&
              (isSvg ? (
                <SvgUri uri={preferred} width={96} height={96} />
              ) : (
                <Image
                  source={{ uri: preferred! }}
                  style={styles.image}
                  resizeMode="contain"
                  accessibilityLabel={`${name} image`}
                />
              ))}
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 14,
    overflow: "hidden",
    minHeight: 120,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },
  heartBadge: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 999,
    padding: 6,
  },
  info: { flex: 1, paddingRight: 8 },
  name: { color: "#fff", fontSize: 14, fontWeight: "800", marginBottom: 8 },
  pillsColumn: { flexDirection: "column", gap: 4 },
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
    maxWidth: "90%",
  },
  pillText: { color: "#fff", fontWeight: "600", fontSize: 10 },
  imageWrap: { width: 70, height: 70, alignItems: "center", justifyContent: "center" },
  image: { width: 70, height: 70 },
});