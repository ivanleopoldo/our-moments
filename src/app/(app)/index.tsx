import { Moment } from "@/components/moment";
import { Header } from "@/components/native/header";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 p-6">
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} />,
        }}
      />
      <View className="flex-1 justify-center gap-2">
        <Moment
          imageUrl="https://picsum.photos/1080/1920"
          title="our special day"
          note="we went out"
        />
      </View>
    </SafeAreaView>
  );
}
