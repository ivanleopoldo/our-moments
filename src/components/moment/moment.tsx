import { View, Image } from "react-native";
import { Text } from "../ui/text";
import { CoupleAvatar } from "../general/couple-avatar";
import { DateAndTime } from "./date-and-time";
import { AspectRatio } from "../ui/aspect-ratio";
import { Card } from "../ui/card";
import dayjs from "dayjs";
import { db, TMoment } from "@/lib/db";

// TODO: make long pressable
export function Moment({
  date = dayjs().toString(),
  ...props
}: Omit<TMoment, "id">) {
  const { isLoading, error, data } = db.useQuery({
    $files: {
      $: {},
    },
  });

  return (
    <Card className="rounded-3xl p-6 justify-between h-5/6">
      <View className="relative gap-3">
        <AspectRatio className="relative w-full overflow-hidden rounded-xl">
          <Image
            source={{ uri: data?.$files[0].url }}
            className="absolute bottom-0 left-0 right-0 top-0 object-cover"
          />
        </AspectRatio>
        <DateAndTime date={dayjs(date)} />
        <View className="gap-1">
          <Text className="font-sans text-3xl text-justify">{props.title}</Text>
          {props.note && (
            <Text className="font-sans text-2xl text-justify">
              {props.note}
            </Text>
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
