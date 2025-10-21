import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Redirect, Tabs } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function AppLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <BottomSheetModalProvider>
      <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="timeline" />
        <Tabs.Screen name="settings" options={{ headerShown: false }} />
      </Tabs>
    </BottomSheetModalProvider>
  );
}
