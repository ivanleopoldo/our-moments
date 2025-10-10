import { View, Image } from "react-native";
import { Text } from "./ui/text";
import { CoupleAvatar } from "./couple-avatar";
import { DateAndTime } from "./date-and-time";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card } from "./ui/card";

export function Moment() {
  return (
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
      <View className="items-baseline flex-row justify-between">
        <Text className="text-muted-foreground text-sm">
          Hiza was with Ivan {"<3"}
        </Text>
        <CoupleAvatar />
      </View>
    </Card>
  );
}
