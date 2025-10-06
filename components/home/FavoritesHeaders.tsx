import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type Props = {
  /** Total de favoritos para mostrar en el subtítulo */
  count?: number;
  /** Altura del header */
  height?: number;
};

export default function FavoritesHeaderDribbble({ count = 0, height = 100 }: Props) {
  return (
    <View style={{ position: "relative" }}>
      <View style={{ height }} className="relative">
        <LinearGradient
          colors={["#FF4D4D", "#E52E71"]} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
        >
          <Image
            source={require("@/assets/images/pokeball.png")}
            style={{
              position: "absolute",
              right: -40,
              top: -30,
              width: 160,
              height: 160,
              opacity: 0.08,
            }}
            contentFit="contain"
            pointerEvents="none"
          />

          <View className="px-4 pt-10">
            <Text className="text-white text-2xl font-extrabold">Favoritos</Text>
            <Text className="text-white/90 mt-1">
              {count > 0 ? `${count} Pokémon guardado${count === 1 ? "" : "s"}` : "Aún no tienes favoritos"}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
