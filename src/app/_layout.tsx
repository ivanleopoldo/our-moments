import "@root/global.css";
import "react-native-reanimated";

import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/clerk-expo";
import { PortalHost } from "@rn-primitives/portal";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <Slot />
              <PortalHost />
              <StatusBar
                translucent
                backgroundColor={"red"}
                style={colorScheme === "dark" ? "light" : "dark"}
              />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </ThemeProvider>
      </ClerkLoaded>
      <ClerkLoading>
        <View className="flex-1 items-center justify-center bg-background">
          <Text className="text-4xl font-bold">Loading...</Text>
          <Text className="text-2xl">Moments</Text>
        </View>
      </ClerkLoading>
    </ClerkProvider>
  );
}
