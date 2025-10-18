import { Text } from "@/components/ui/text";
import { router, Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Row } from "@/components/native/ios-list";
import { Entypo } from "@/lib/icons/entypo";
import { useClerk } from "@clerk/clerk-expo";

export default function Settings() {
  const { signOut } = useClerk();
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
            <Row onPress={() => router.replace("/onboarding")}>
              <Text>Go to Onboarding</Text>
            </Row>
            <Row onPress={() => router.replace("/connect")}>
              <Text>Go to Connect</Text>
            </Row>
          </List>
          <List header=" ">
            <Row
              className="flex-1"
              onPress={async () => {
                await signOut();
              }}
            >
              <View className="self-center flex-row gap-2 items-center">
                <Entypo name="log-out" className="text-destructive" size={16} />
                <Text className="text-destructive">Log Out</Text>
              </View>
            </Row>
          </List>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
