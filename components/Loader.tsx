import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

type LoaderProps = {
  visible: boolean;
  message?: string;
  backdropOpacity?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
};

export default function Loader({
  visible,
  message,
  backdropOpacity = 0.85,
  dismissible = false,
  onDismiss,
}: LoaderProps) {

  if (!visible) return null;

  const Container = dismissible ? Pressable : View;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Container
        style={[
          styles.backdrop,
          { backgroundColor: `rgba(0,0,0,${backdropOpacity})` },
        ]}
        onPress={dismissible ? onDismiss : undefined}
      >
        <Image
          source={require("@/assets/gif/loader-pokeball.gif")}
          style={styles.image}
          contentFit="contain"
          accessibilityLabel="Cargando…"
        />
        {message ? <Text style={styles.text}>{message}</Text> : null}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  image: {
    width: 180,
    height: 180,
  },
  text: {
    marginTop: 12,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
