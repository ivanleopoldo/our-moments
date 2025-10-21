import { View } from "react-native";
import { Entypo } from "@/lib/icons/entypo";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CoupleAvatar } from "../general/couple-avatar";
import { Dayjs } from "dayjs";
import { useDateStore } from "@/lib/stores/use-date-store";

export type HeaderProps = {
  date?: Dayjs;
  onPressDate?: () => void;
};

export function Header(props: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { date, isToday } = useDateStore();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="w-full items-center flex-row justify-between px-4 gap-1 pb-4"
    >
      <Button onPress={() => router.push("/settings")} variant={"ghost"}>
        <CoupleAvatar />
      </Button>

      <View className="items-center flex-row gap-2 px-2">
        <Button
          variant="outline"
          className="justify-evenly"
          onPress={props.onPressDate}
        >
          <Text>
            {isToday(date)
              ? "Today"
              : isToday(date, "year")
                ? date.format("MMM D")
                : date.format("MMM D, YYYY")}
          </Text>
          <Entypo name="chevron-down" className="text-foreground" />
        </Button>
      </View>
    </View>
  );
}
