import { Moment } from "@/components/moment";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 p-6">
      <View className="flex-1 justify-center gap-2">
        <Moment />
      </View>
    </SafeAreaView>
  );
}
