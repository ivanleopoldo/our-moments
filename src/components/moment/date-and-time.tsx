import { View } from "react-native";
import { Pill, PillList } from "./pill";
import dayjs, { Dayjs } from "dayjs";

export type DateAndTimeProps = {
  date?: Dayjs;
};

export function DateAndTime({ date = dayjs() }: DateAndTimeProps) {
  return (
    <View className="w-full flex-row items-center justify-between">
      <PillList>
        <Pill>{date.format("MMM")}</Pill>
        <Pill>{date.format("D")}</Pill>
        <Pill>{date.year()}</Pill>
      </PillList>
      <PillList>
        <Pill>{date.format("ddd")}</Pill>
        <Pill>{date.format("h:m")}</Pill>
      </PillList>
    </View>
  );
}
