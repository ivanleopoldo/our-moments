import { useUser } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <BottomSheetModalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="moment/[id]" />
        <Stack.Screen name="connect" />
        <Stack.Screen name="onboarding" />
      </Stack>
    </BottomSheetModalProvider>
  );
}
