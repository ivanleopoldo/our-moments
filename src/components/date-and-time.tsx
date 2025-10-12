import { View } from "react-native";
import { Pill, PillList } from "./pill";

export function DateAndTime() {
  return (
    <View className="w-full items-center flex-row justify-between">
      <PillList>
        <Pill>Oct</Pill>
        <Pill>10</Pill>
        <Pill>2024</Pill>
      </PillList>
      <PillList>
        <Pill>Fri</Pill>
        <Pill>1:52 PM</Pill>
      </PillList>
    </View>
  );
}
