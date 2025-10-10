import { CoupleAvatar } from "@/components/couple-avatar";
import { DateAndTime } from "@/components/date-and-time";
import { Header } from "@/components/native/header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";
import { Image, View } from "react-native";
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
        <Card className="rounded-3xl p-4 mb-8">
          <View className="relative gap-2">
            <AspectRatio className="relative w-full overflow-hidden rounded-xl">
              <Image
                source={{ uri: "https://picsum.photos/1080/1920" }}
                className="absolute bottom-0 left-0 right-0 top-0 object-cover"
              />
            </AspectRatio>
            <DateAndTime />
            <View>
              <Text className="font-sans text-xl text-justify">
                our special day {"\n"}we went out
              </Text>
            </View>
          </View>
          <CoupleAvatar />
        </Card>
      </View>
    </SafeAreaView>
  );
}
