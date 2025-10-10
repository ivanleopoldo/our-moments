import "@root/global.css";
import "react-native-reanimated";

import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export const unstable_settings = {
  anchor: "index",
  initialRouteName: "index",
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
