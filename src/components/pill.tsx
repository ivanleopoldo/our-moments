import { cn } from "@/lib/utils";
import { Text, TextProps, View, ViewProps } from "react-native";

export function Pill({
  children,
  ...props
}: { children: React.ReactNode } & TextProps) {
  return (
    <Text
      {...props}
      className={cn(
        props.className,
        "self-start py-1 text-muted-foreground bg-input/20 border-border border rounded-full px-2",
      )}
    >
      {children}
    </Text>
  );
}

export function PillList({ ...props }: ViewProps) {
  return (
    <View className={cn(props.className, "flex-row gap-1 items-center")}>
      {props.children}
    </View>
  );
}
