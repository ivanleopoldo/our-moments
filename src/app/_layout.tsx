import "@root/global.css";
import "react-native-reanimated";

import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "index",
  initialRouteName: "index",
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="moment/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="settings"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
        <PortalHost />
        <StatusBar
          translucent
          backgroundColor={"red"}
          style={colorScheme === "dark" ? "light" : "dark"}
        />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
