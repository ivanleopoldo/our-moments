import { View } from "react-native";
import { Entypo } from "@/lib/icons/entypo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { CoupleAvatar } from "../couple-avatar";

export type HeaderProps = {
  date?: Date;
  onPressDate?: () => void;
  goPreviousDay?: () => void;
  goNextDay?: () => void;
} & NativeStackHeaderProps;

export function Header(props: HeaderProps) {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const selected = props.date ? new Date(props.date) : today;

  const isNextDisabled =
    selected.getFullYear() === today.getFullYear() &&
    selected.getMonth() === today.getMonth() &&
    selected.getDate() === today.getDate();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="w-full items-center flex-row justify-between px-4 gap-1 pb-4"
    >
      <Button onPress={() => router.push("/settings")} variant={"ghost"}>
        <CoupleAvatar />
      </Button>

      <View className="items-center flex-row gap-2 px-2">
        <Button variant="outline" size="icon" onPress={props.goPreviousDay}>
          <Entypo name="chevron-left" className="text-foreground" />
        </Button>

        <Button
          variant="outline"
          className="w-24 justify-evenly"
          onPress={props.onPressDate}
        >
          <Text>
            {selected
              ? selected.toDateString() === today.toDateString()
                ? "Today"
                : selected.getFullYear() === today.getFullYear()
                  ? selected.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : selected.toLocaleDateString("en-US")
              : ""}
          </Text>
          <Entypo name="chevron-down" className="text-foreground" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={isNextDisabled}
          onPress={props.goNextDay}
        >
          <Entypo name="chevron-right" className="text-foreground" />
        </Button>
      </View>
    </View>
  );
}
