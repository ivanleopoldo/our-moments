import { useMemo } from "react";
import { View, Text } from "react-native";

export default function DateAndTime() {
  const style = useMemo(
    () => "self-start py-1 bg-input/20 border-border border rounded-full px-2",
    [],
  );

  return (
    <View className="items-center flex-row justify-between">
      <View className="flex-row gap-1">
        <Text className={style}>10</Text>
        <Text className={style}>10</Text>
        <Text className={style}>2024</Text>
      </View>
      <Text className={style}>1:52 PM</Text>
    </View>
  );
}
