import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Fontisto } from "@/lib/icons/fontisto";
import { router } from "expo-router";

export default function Auth() {
  return (
    <SafeAreaView className="flex-1 p-6 items-center gap-4 justify-center">
      <View className="items-center gap-1">
        <Text className="font-bold text-center text-3xl">
          Welcome to Moments
        </Text>
        <Text className="text-lg text-center text-muted-foreground">
          Continue to create moments with your special one
        </Text>
      </View>
      <View className="gap-1 w-full">
        <Button
          onPress={() => router.replace("/(auth)/onboarding")}
          variant={"outline"}
        >
          <Fontisto name="google" className="text-foreground" size={16} />
          <Text>Continue with Google</Text>
        </Button>
        <Button variant={"outline"}>
          <Fontisto name="github" className="text-foreground" size={16} />
          <Text>Continue with GitHub</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
