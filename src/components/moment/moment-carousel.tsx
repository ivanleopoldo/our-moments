import { Dimensions, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Moment, MomentProps } from "./moment";
import { useDateStore } from "@/lib/stores/use-date-store";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

type MomentCarouselProps = {
  data: MomentProps[];
  onDateChange?: (date: Dayjs) => void;
};

export function MomentCarousel({ data, onDateChange }: MomentCarouselProps) {
  const carouselRef = useRef<ICarouselInstance>(null);
  const { date, setDate } = useDateStore();
  const onProgressChange = (date: Dayjs) => {
    setDate(date);
    onDateChange?.(date);
  };

  const sortedData = [...data].sort(
    (a, b) => (a.date?.valueOf() ?? 0) - (b.date?.valueOf() ?? 0),
  );

  useEffect(() => {
    const index = sortedData.findIndex((item) =>
      item.date?.isSame(date, "day"),
    );
    if (index !== -1) {
      carouselRef.current?.scrollTo({ index, animated: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <View className="flex-1 mt-10 items-center justify-center">
      <Carousel
        ref={carouselRef}
        width={width}
        pagingEnabled
        mode="parallax"
        loop={false}
        defaultIndex={data.length - 1}
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 15,
        }}
        data={sortedData}
        onSnapToItem={(index) =>
          onProgressChange(sortedData[index].date ?? dayjs())
        }
        renderItem={({ item }) => <Moment {...item} />}
      />
    </View>
  );
}
