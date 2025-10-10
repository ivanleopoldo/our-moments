import { NAV_THEME } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { cssInterop, useColorScheme } from "nativewind";
import { GestureResponderEvent, Pressable } from "react-native";
import {
  List as BaseList,
  Row as BaseRow,
  RowProps,
  type ListProps,
} from "react-native-ios-list";

const InteropList = cssInterop(BaseList, {
  className: { target: "style" },
});

export const List = ({
  className,
  ...props
}: { className?: string } & ListProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <InteropList
      sideBar={props.sideBar ?? true}
      inset={props.inset ?? true}
      className={cn("bg-card border-border border", className)}
      dividerColor={NAV_THEME[colorScheme ?? "light"].colors.border}
      {...props}
    />
  );
};

const InteropRow = cssInterop(BaseRow, {
  className: {
    target: "style",
  },
});

export const Row = ({
  className,
  onPress,
  onLongPress,
  ...props
}: {
  className?: string;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPress?: (event: GestureResponderEvent) => void;
} & Omit<RowProps, "onPress">) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="active:bg-background/20"
    >
      <InteropRow {...props} className={cn("", className)}>
        {props.children}
      </InteropRow>
    </Pressable>
  );
};
