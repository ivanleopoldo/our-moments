import { cn } from "@/lib/utils";
import { OTPInput, type OTPInputRef, type SlotProps } from "input-otp-native";
import React, { useRef, useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type InputOTPProps = {
  maxLength?: number;
  fixedCode?: string;
  onComplete?: (code: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function InputOTP({
  maxLength = 6,
  fixedCode = "",
  onComplete,
  onFocus,
  onBlur,
}: InputOTPProps) {
  const ref = useRef<OTPInputRef>(null);

  const SLOT_COUNT = maxLength;
  const parentWidth = Dimensions.get("window").width - 128;
  const GAP = 2;
  const dashWidth = 8;
  const slotWidth =
    (parentWidth - GAP * (SLOT_COUNT - 1) - dashWidth) / SLOT_COUNT;

  const handleComplete = (code: string) => {
    onComplete?.(code);
  };

  const handleFocus = () => {
    onFocus?.();
  };

  const handleBlur = () => {
    onBlur?.();
  };

  return (
    <View className="w-full">
      <OTPInput
        ref={ref}
        {...(fixedCode ? { value: fixedCode } : {})}
        editable={!fixedCode}
        onComplete={handleComplete}
        maxLength={SLOT_COUNT}
        onFocus={handleFocus}
        onBlur={handleBlur}
        render={({ slots }) => (
          <View
            className="flex-row w-full justify-between items-center"
            style={{ gap: GAP }}
          >
            {slots.map((slot, idx) => (
              <React.Fragment key={idx}>
                <Slot
                  {...slot}
                  width={slotWidth}
                  char={fixedCode ? fixedCode[idx] : slot.char}
                  hasFakeCaret={!fixedCode && slot.hasFakeCaret}
                />
                {idx === Math.floor(SLOT_COUNT / 2) - 1 && (
                  <FakeDash width={dashWidth} />
                )}
              </React.Fragment>
            ))}
          </View>
        )}
      />
    </View>
  );
}

function Slot({
  char,
  isActive,
  hasFakeCaret,
  width,
}: SlotProps & { width: number }) {
  const fontSize = width * 0.45;
  const caretHeight = width * 0.5;

  return (
    <View
      className={cn(
        "items-center justify-center rounded-xl border bg-input/30",
        {
          "border-primary border-2": isActive,
          "border-border border": !isActive,
        },
      )}
      style={{ width, height: width }}
    >
      {char !== null && (
        <Text className="text-foreground font-medium" style={{ fontSize }}>
          {char}
        </Text>
      )}
      {hasFakeCaret && <FakeCaret height={caretHeight} />}
    </View>
  );
}

function FakeDash({ width }: { width: number }) {
  return (
    <View className="items-center justify-center">
      <View className="bg-border rounded-sm" style={{ width, height: 2 }} />
    </View>
  );
}

function FakeCaret({ height }: { height: number }) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="absolute w-full h-full items-center justify-center">
      <Animated.View
        className="bg-primary"
        style={[{ width: 2, height, borderRadius: 1 }, animatedStyle]}
      />
    </View>
  );
}
