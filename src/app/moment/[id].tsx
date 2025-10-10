import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Entypo } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 p-6">
      <View className="flex-1 justify-center gap-2">
        <Card className="rounded-3xl p-4">
          <View className="relative gap-2">
            <AspectRatio className="relative w-full overflow-hidden rounded-xl">
              <Image
                source={{ uri: "https://picsum.photos/1080/1920" }}
                className="absolute bottom-0 left-0 right-0 top-0 object-cover"
              />
            </AspectRatio>
            <View className="items-center flex-row justify-between">
              <View className="flex-row gap-1">
                <Text className="self-start bg-input/20 border-border border rounded-full px-2">
                  10
                </Text>
                <Text className="self-start bg-input/20 border-border border rounded-full px-2">
                  10
                </Text>
                <Text className="self-start bg-input/20 border-border border rounded-full px-2">
                  2024
                </Text>
              </View>
              <Text className="self-start bg-input/20 border-border border rounded-full px-2">
                1:52 PM
              </Text>
            </View>
            <View>
              <Text className="font-sans text-xl">our special day</Text>
            </View>
          </View>
          <View className="items-center justify-end flex-row gap-1">
            <Avatar alt="@mrzachnugent" className="border-border border">
              <AvatarImage
                source={{ uri: "https://github.com/mrzachnugent.png" }}
              />
              <AvatarFallback>
                <Text>ZN</Text>
              </AvatarFallback>
            </Avatar>
            <Entypo className="text-primary" size={24} name="heart" />
            <Avatar alt="@leerob" className="border-border border">
              <AvatarImage source={{ uri: "https://github.com/leerob.png" }} />
              <AvatarFallback>
                <Text>LR</Text>
              </AvatarFallback>
            </Avatar>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
