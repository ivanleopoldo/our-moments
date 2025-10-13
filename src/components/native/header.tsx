import { View } from "react-native";
import { Entypo } from "@/lib/icons/entypo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { CoupleAvatar } from "../general/couple-avatar";
import { Dayjs } from "dayjs";
import { useDateStore } from "@/lib/stores/use-date-store";

export type HeaderProps = {
  date?: Dayjs;
  onPressDate?: () => void;
  goPreviousDay?: () => void;
  goNextDay?: () => void;
} & NativeStackHeaderProps;

export function Header(props: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { date, subDays, addDays, isSame, isAfter } = useDateStore();

  const goPreviousDay = props.goPreviousDay || (() => subDays(1));

  const goNextDay = props.goNextDay || (() => addDays(1));

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="w-full items-center flex-row justify-between px-4 gap-1 pb-4"
    >
      <Button onPress={() => router.push("/settings")} variant={"ghost"}>
        <CoupleAvatar />
      </Button>

      <View className="items-center flex-row gap-2 px-2">
        <Button variant="outline" size="icon" onPress={goPreviousDay}>
          <Entypo name="chevron-left" className="text-foreground" />
        </Button>

        <Button
          variant="outline"
          className="w-24 justify-evenly"
          onPress={props.onPressDate}
        >
          <Text>
            {isSame(date)
              ? "Today"
              : isSame(date, "year")
                ? date.format("MMM D")
                : date.format("M/D/YY")}
          </Text>
          <Entypo name="chevron-down" className="text-foreground" />
        </Button>

        <Button
          disabled={isAfter(date)}
          variant="outline"
          size="icon"
          onPress={goNextDay}
        >
          <Entypo name="chevron-right" className="text-foreground" />
        </Button>
      </View>
    </View>
  );
}
