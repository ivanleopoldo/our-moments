import { View } from "react-native";
import { Entypo } from "@/lib/icons/entypo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { CoupleAvatar } from "../couple-avatar";

export function Header(props: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="w-full items-center flex-row justify-between px-4 gap-1 pb-4"
    >
      <Button onPress={() => router.push("/settings")} variant={"ghost"}>
        <CoupleAvatar />
      </Button>
      <View className="items-center flex-row gap-2 px-2">
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
