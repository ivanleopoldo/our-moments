import { Moment } from "@/components/moment";
import { Header } from "@/components/native/header";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import DatePicker from "rndtpkr";
import { Text } from "@/components/ui/text";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 p-6">
      <Stack.Screen
        options={{
          header: (props) => (
            <Header {...props} onPressDate={openBottomSheet} />
          ),
        }}
      />

      <View className="flex-1 justify-center gap-2">
        <Moment
          imageUrl="https://picsum.photos/1080/1920"
          title="our special day"
          note={"We went out on"}
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
            className="mt-4 -mb-2 rounded-lg h-1.5  w-10 bg-foreground/10 self-center"
          />
        )}
        backgroundComponent={(props) => (
          <View {...props} className="flex-1 bg-background rounded-t-lg"></View>
        )}
      >
        <BottomSheetView className="px-6 pt-4 pb-10">
          <Text>Date</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
