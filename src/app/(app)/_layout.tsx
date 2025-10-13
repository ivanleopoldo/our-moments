import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="moment/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{
            headerLargeTitle: true,
            headerTitle: "Settings",
            presentation: "modal",
          }}
        />
        <Stack.Screen name="connect" options={{ headerShown: false }} />
      </Stack>
    </BottomSheetModalProvider>
  );
}
