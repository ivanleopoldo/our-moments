import { Moment } from "@/components/moment/moment";
import { db } from "@/lib/db";
import { BottomSheetModal } from "@/components/native/bottom-sheet-modal";
import { DatePicker } from "@/components/native/date-picker";
import { Header } from "@/components/native/header";
import { useDateStore } from "@/lib/stores/use-date-store";
import { BottomSheetModal as RNBottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, Tabs } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

export default function Home() {
  const bottomSheetModalRef = useRef<RNBottomSheetModal>(null);
  const { date, setDate } = useDateStore();

  const { isLoading, error, data } = db.useQuery({
    moments: {
      $: {},
    },
  });

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1">
      <Tabs.Screen
        options={{
          header: (props) => (
            <Header
              onPressDate={() => bottomSheetModalRef.current?.present()}
            />
          ),
        }}
      />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      ) : (
        <Moment
          date={data?.moments[0].date as string}
          imageUrl={data?.moments[0].imageUrl as string}
          title={data?.moments[0].title as string}
          note={data?.moments[0].note as string}
        />
      )}

      <BottomSheetModal ref={bottomSheetModalRef}>
        <DatePicker
          date={date}
          onChange={(selectedDate) => setDate(selectedDate)}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
}
