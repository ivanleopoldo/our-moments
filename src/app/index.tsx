import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 p-4 bg-background">
      <View>
        <Text className="font-bold text-foreground">Start Developing Now</Text>
      </View>
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <View className="gap-2 p-4">
          <Text className="text-foreground font-mono text-sm">
            1. Edit <Text variant="code">src/app/index.tsx</Text> to get
            started.
          </Text>
          <Text className="text-foreground font-mono text-sm">
            2. Save to see your changes instantly.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
