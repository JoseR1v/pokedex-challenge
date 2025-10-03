import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { setUserName } from "@/helpers/storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function LoginScreen() {
  const [name, setName] = useState("");

  const onContinue = async () => {
    if (!name.trim()) return;
    await setUserName(name);
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-light-gray"
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View className="flex-1 relative">
        <Image
          source={require("@/assets/images/pokeball.png")}
          className="absolute"
          style={{ position: "absolute", width: 620, height: 620, right: -260, bottom: 180, opacity: 0.6 }}
          contentFit="contain"
          pointerEvents="none"
        />

        <View className="flex-1 p-4 items-center justify-evenly">
          <Image
            source={require("@/assets/images/Pokedex_logo.png")}
            style={{ width: 280, height: 120 }}
            contentFit="contain"
            accessibilityLabel="Logo de la Pokédex"
          />

          <View className="gap-2">
            <Text className="text-5xl text-center text-black font-bold py-1">Bienvenid@</Text>
            <Text className="text-2xl font-semibold text-really-gray text-center">
              ¡Conviertete en un Maestro Pokémon!
            </Text>
            <Text className="text-xl text-really-grey text-center">
              En este Pokédex encontrarás la información más importante de tus pokemons favoritos.
            </Text>
          </View>

          <View className="w-full items-center pb-12">
            <Input
              label="Ingresa tu nombre"
              placeholder="Nombre del entrenador/a"
              value={name}
              onChangeText={setName}
              containerStyle={{ marginVertical: 16, width: "100%" }}
            />

            <Button fullWidth variant="danger" size="lg" onPress={onContinue}>
              Continuar
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}