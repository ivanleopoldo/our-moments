import { Moment } from "@/components/moment";
import { Header } from "@/components/native/header";
import { Entypo } from "@/lib/icons/entypo";
import { cn } from "@/lib/utils";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, { DateType, useDefaultClassNames } from "rndtpkr";

function normalizeDate(d: DateType): Date {
  if (!d) return new Date();
  if (d instanceof Date) return d;
  if (typeof d === "string" || typeof d === "number") return new Date(d);
  if ("toDate" in d) return d.toDate();
  return new Date();
}

export default function Home() {
  const defaultClassNames = useDefaultClassNames();
  const [date, setDate] = useState<DateType>(new Date());
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const goPreviousDay = () => {
    const d = normalizeDate(date);
    const prev = new Date(d.getTime());
    prev.setDate(prev.getDate() - 1);
    setDate(prev);
  };

  const goNextDay = () => {
    const d = normalizeDate(date);
    const next = new Date(d.getTime());
    next.setDate(next.getDate() + 1);
    setDate(next);
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 p-6">
      <Stack.Screen
        options={{
          header: (props) => (
            <Header
              {...props}
              date={normalizeDate(date)}
              onPressDate={openBottomSheet}
              goPreviousDay={goPreviousDay}
              goNextDay={goNextDay}
            />
          ),
        }}
      />

      <View className="flex-1 justify-center gap-2">
        <Moment
          imageUrl="https://picsum.photos/1080/1920"
          title="our special day"
          note={`We went out on ${normalizeDate(date).toDateString()}`}
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={["50%"]}
        enablePanDownToClose
        enableDynamicSizing={false}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            {...props}
          />
        )}
        handleComponent={(props) => (
          <View
            {...props}
            className="mt-4 -mb-2 rounded-lg h-1.5 w-10 bg-foreground/10 self-center"
          />
        )}
        backgroundComponent={(props) => (
          <View {...props} className="flex-1 bg-background rounded-t-lg" />
        )}
      >
        <BottomSheetView className="px-6 pt-4 flex-1 pb-10">
          <DateTimePicker
            mode="single"
            date={date}
            showOutsideDays
            minDate={new Date(0)}
            maxDate={new Date()}
            components={{
              IconPrev: (
                <Entypo name="chevron-left" className="text-foreground" />
              ),
              IconNext: (
                <Entypo name="chevron-right" className="text-foreground" />
              ),
            }}
            onChange={({ date }) => setDate(date)}
            classNames={{
              ...defaultClassNames,
              today: "bg-input/30 rounded-2xl border-border border",
              today_label: "font-bold text-foreground",
              selected: cn(
                defaultClassNames.selected,
                "bg-accent border-border border rounded-2xl",
              ),
              selected_label: "font-bold text-foreground",
              button_next: cn(
                defaultClassNames.button_next,
                "w-10 h-10 items-center justify-center rounded-full border-border border bg-input/30",
              ),
              button_prev: cn(
                defaultClassNames.button_prev,
                "w-10 h-10 items-center justify-center rounded-full border-border border bg-input/30",
              ),
              month_selector: cn(
                defaultClassNames.month_selector,
                "p-3 border-border border rounded-full bg-input/30 text-foreground font-semibold",
              ),
              year_selector: cn(
                defaultClassNames.year_selector,
                "p-3 border-border border rounded-full bg-input/30 text-foreground font-semibold",
              ),
              outside: "opacity-50",
              month_selector_label: cn(
                defaultClassNames.month_selector_label,
                "text-sm font-semibold text-foreground",
              ),
              year_selector_label: cn(
                defaultClassNames.year_selector_label,
                "text-sm font-semibold text-foreground",
              ),
              selected_month: "bg-accent border-border border rounded-2xl",
              selected_month_label: "font-semibold text-foreground",
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
