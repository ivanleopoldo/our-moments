import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect, Stack } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function AppLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

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
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="connect" options={{ headerShown: false }} />
      </Stack>
    </BottomSheetModalProvider>
  );
}
