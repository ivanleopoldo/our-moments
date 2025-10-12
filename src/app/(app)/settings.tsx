import { Text } from "@/components/ui/text";
import { router, Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Row } from "@/components/native/ios-list";

export default function Settings() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerBlurEffect: "prominent",
        }}
      />
      <SafeAreaView edges={[]} className="flex-1">
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerClassName="py-4"
        >
          <List header="Sandbox">
            <Row onPress={() => router.replace("/(auth)")}>
              <Text>Go to Auth</Text>
            </Row>
            <Row onPress={() => router.replace("/(auth)/onboarding")}>
              <Text>Go to Onboarding</Text>
            </Row>
            <Row onPress={() => router.replace("/(app)/connect")}>
              <Text>Go to Connect</Text>
            </Row>
          </List>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
