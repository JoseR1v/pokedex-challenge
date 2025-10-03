import { clearAll } from "@/helpers";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

function LogoutTabButton(props: any) {
  const router = useRouter();
  const selected = props?.accessibilityState?.selected;
  const color = selected ? "#ef4444" : "#9CA3AF";

  const onPress = async (e: any) => {
    e?.preventDefault?.();
    await clearAll();
    router.replace("/login");
  };

  return (
    <Pressable onPress={onPress} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Ionicons name="log-out-outline" size={22} color={color} />
      <Text style={{ color, fontSize: 12, fontWeight: "600", marginTop: 2 }}>Salir</Text>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ef4444",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: { backgroundColor: "#fff", borderTopColor: "rgba(0,0,0,0.06)", height: 60, paddingBottom: 8, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pokédex",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Salir",
          tabBarButton: (props) => <LogoutTabButton {...props} />,
        }}
      />
    </Tabs>
  );
}
