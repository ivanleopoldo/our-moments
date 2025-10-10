import { View } from "react-native";
import { Entypo } from "@/lib/icons/entypo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";

export default function Header(props: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="w-full items-center flex-row justify-between px-4 gap-1 pb-4"
    >
      <View className="items-center flex-row gap-1">
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
      <View className="items-center flex-row gap-2">
        <Button variant="outline" size="icon">
          <Entypo name="chevron-left" className="text-foreground" />
        </Button>
        <Button onPress={() => router.push("/moment/1")} variant="outline">
          <Text>Today</Text>
          <Entypo name="chevron-down" className="text-foreground" />
        </Button>
        <Button variant="outline" size="icon">
          <Entypo name="chevron-right" className="text-foreground" />
        </Button>
      </View>
    </View>
  );
}
