import { View, Image } from "react-native";
import { Text } from "../ui/text";
import { CoupleAvatar } from "../general/couple-avatar";
import { DateAndTime } from "./date-and-time";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card } from "../ui/card";
import dayjs, { Dayjs } from "dayjs";

export type MomentProps = {
  imageUrl: string;
  title: string;
  note?: string;
  date?: Dayjs;
};

export function Moment({ date = dayjs(), ...props }: MomentProps) {
  return (
    <Card className="rounded-3xl p-4 justify-between">
      <View className="relative gap-2">
        <AspectRatio className="relative w-full overflow-hidden rounded-xl">
          <Image
            source={{ uri: props.imageUrl }}
            className="absolute bottom-0 left-0 right-0 top-0 object-cover"
          />
        </AspectRatio>
        <DateAndTime date={date} />
        <View>
          <Text className="font-sans text-2xl text-justify">{props.title}</Text>
          {props.note && (
            <Text className="font-sans text-xl text-justify">{props.note}</Text>
          )}
        </View>
      </View>
      <View className="items-baseline flex-row justify-between">
        <Text className="text-muted-foreground text-sm">
          Hiza was with Ivan
        </Text>
        <CoupleAvatar />
      </View>
    </Card>
  );
}
