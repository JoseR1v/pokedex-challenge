import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  name?: string | null;
  children?: React.ReactNode;
  height?: number;
};

export default function HomeHeader({
  name,
  children,
  height = 200,
}: Props) {
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
              width: 260,
              height: 260,
              opacity: 0.3,
            }}
            contentFit="contain"
            pointerEvents="none"
          />

          <View className="px-4 pt-6">
            <View className="flex-row items-center justify-between pt-4">
              <View>
                <Text className="text-white text-5xl font-extrabold">Pokédex</Text>
                <Text className="text-white/90 mt-1 text-lg">
                  Hola <Text className="font-extrabold text-2xl">{name ?? "Entrenador/a"}</Text>
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {children ? (
        <View
          style={{
            marginTop: -80,
            paddingHorizontal: 16,
            zIndex: 20,
          }}
        >
          <View
            className="bg-white rounded-xl px-3 py-3"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            {children}
          </View>
        </View>
      ) : null}
    </View>
  );
}