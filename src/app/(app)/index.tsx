import { MomentProps } from "@/components/moment/moment";
import { MomentCarousel } from "@/components/moment/moment-carousel";
import { BottomSheetModal } from "@/components/native/bottom-sheet-modal";
import { DatePicker } from "@/components/native/date-picker";
import { Header } from "@/components/native/header";
import { useDateStore } from "@/lib/stores/use-date-store";
import { BottomSheetModal as RNBottomSheetModal } from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import { Stack } from "expo-router";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const bottomSheetModalRef = useRef<RNBottomSheetModal>(null);
  const { date, setDate } = useDateStore();

  const data: MomentProps[] = [
    {
      imageUrl: "https://picsum.photos/1080/1920",
      title: "Day 1",
      note: "went out",
      date: dayjs(),
    },
    {
      imageUrl: "https://picsum.photos/1080/1920",
      title: "Day 2",
      note: "went out",
      date: dayjs().subtract(1, "day"),
    },
    {
      imageUrl: "https://picsum.photos/1080/1920",
      title: "Day 3",
      note: "went out",
      date: dayjs().subtract(2, "day"),
    },
    {
      imageUrl: "https://picsum.photos/1080/1920",
      title: "Day 4",
      note: "went out",
      date: dayjs().subtract(3, "day"),
    },
  ];

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1">
      <Stack.Screen
        options={{
          header: (props) => (
            <Header
              onPressDate={() => bottomSheetModalRef.current?.present()}
              {...props}
            />
          ),
        }}
      />

      <MomentCarousel data={data} />

      <BottomSheetModal ref={bottomSheetModalRef}>
        <DatePicker
          date={date}
          onChange={(selectedDate) => setDate(selectedDate)}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
}
