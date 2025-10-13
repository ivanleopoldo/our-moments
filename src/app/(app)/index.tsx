import { Moment } from "@/components/moment";
import { Header } from "@/components/native/header";
import dayjs from "dayjs";
import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDateStore } from "@/lib/stores/use-date-store";
import { BottomSheetModal } from "@/components/bottom-sheet-modal";
import { useRef } from "react";
import { BottomSheetModal as RNBottomSheetModal } from "@gorhom/bottom-sheet";
import DatePicker from "@/components/date-picker";

export default function Home() {
  const bottomSheetModalRef = useRef<RNBottomSheetModal>(null);
  const { date, setDate } = useDateStore();

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
      <View>
        <Moment
          imageUrl="https://picsum.photos/500"
          title="special day"
          date={dayjs("2025-10-15 4:39")}
        />
      </View>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <DatePicker date={date} onChange={(date) => setDate(date)} />
      </BottomSheetModal>
    </SafeAreaView>
  );
}
