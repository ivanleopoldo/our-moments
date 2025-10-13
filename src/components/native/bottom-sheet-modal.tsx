import {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal as RNBottomSheetModal,
  BottomSheetModalProps as RNBottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";

type BottomSheetModalProps = {
  ref: React.Ref<RNBottomSheetModal>;
  children?: React.ReactNode;
} & RNBottomSheetModalProps;

export function BottomSheetModal({
  ref,
  children,
  ...props
}: BottomSheetModalProps) {
  return (
    <RNBottomSheetModal
      {...props}
      ref={ref}
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
        {children}
      </BottomSheetView>
    </RNBottomSheetModal>
  );
}
