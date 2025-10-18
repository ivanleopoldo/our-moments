import { Entypo } from "@/lib/icons/entypo";
import { useDateStore } from "@/lib/stores/use-date-store";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import { Dimensions, Pressable, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Text } from "../ui/text";
import { Moment, MomentProps } from "./moment";

const { width } = Dimensions.get("window");

type MomentCarouselProps = {
  data: MomentProps[];
  onDateChange?: (date: Dayjs) => void;
};

export function MomentCarousel({ data, onDateChange }: MomentCarouselProps) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const { date, setDate } = useDateStore();

  const parsedData = useMemo(
    () =>
      data
        .map((item) => ({
          ...item,
          date: dayjs(item.date), // safely parse strings
        }))
        .sort((a, b) => (a.date?.valueOf() ?? 0) - (b.date?.valueOf() ?? 0)),
    [data],
  );

  // FIX: performance optimizations
  const filledData = useMemo(() => {
    if (parsedData.length === 0) return [];

    const start = parsedData[0].date.startOf("month");
    const end = parsedData[parsedData.length - 1].date.startOf("day");
    const days: (MomentProps & { empty?: boolean })[] = [];

    let current = start;
    while (current.isBefore(end) || current.isSame(end, "day")) {
      const existing = parsedData.find((item) =>
        item.date.isSame(current, "day"),
      );

      if (existing) {
        days.push(existing);
      } else {
        days.push({
          date: current,
          title: "",
          note: "",
          imageUrl: "",
          empty: true,
        });
      }

      current = current.add(1, "day");
    }

    return days;
  }, [parsedData]);

  const onProgressChange = (newDate: Dayjs) => {
    setDate(newDate);
    onDateChange?.(newDate);
  };

  useEffect(() => {
    const index = filledData.findIndex((item) =>
      item.date?.isSame(date, "day"),
    );
    if (index !== -1) {
      carouselRef.current?.scrollTo({ index, animated: true });
    }
  }, [date, filledData]);

  return (
    <View className="flex-1 items-center justify-center">
      <Carousel
        ref={carouselRef}
        width={width}
        pagingEnabled
        mode="parallax"
        loop={false}
        defaultIndex={filledData.length - 1}
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 15,
        }}
        data={filledData}
        onSnapToItem={(index) =>
          onProgressChange(filledData[index].date ?? dayjs())
        }
        renderItem={({ item }) =>
          item.empty ? <EmptyMomentCard /> : <Moment {...item} />
        }
      />
    </View>
  );
}

function EmptyMomentCard() {
  return (
    <Pressable className="rounded-3xl active:bg-input/30 bg-background border-border border-4 border-dashed p-4 justify-center items-center h-5/6">
      <View className="w-1/2 gap-4 items-center justify-center">
        <Entypo name="plus" size={74} className="text-border" />
        <Text className="text-border text-center text-4xl text-wrap font-bold">
          CREATE A MOMENT
        </Text>
      </View>
    </Pressable>
  );
}
