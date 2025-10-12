import { ExpandingDot } from "@/components/native/pagination-dots";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import { Animated, Dimensions, View } from "react-native";
import PagerView, {
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function Onboarding() {
  const ref = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

  const width = Dimensions.get("window").width;
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  const size = 3;

  const onPageScrollAnimated = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        { useNativeDriver: false },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handlePageScroll = (e: PagerViewOnPageScrollEventData) => {
    const position = e.position;
    const offset = e.offset;
    const nextPage = Math.round(position + offset);
    if (nextPage !== page) setPage(nextPage);
  };

  const handlePageScrollCombined = (e: any) => {
    onPageScrollAnimated(e);
    handlePageScroll(e.nativeEvent);
  };

  const inputRange = [0, size];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, size * width],
  });

  const handleContinue = () => {
    if (page < size - 1) {
      ref.current?.setPage(page + 1);
    } else {
      console.log("🎉 Finished onboarding");
    }
  };

  const pages = [
    {
      key: "1",
      title: "Welcome to Moments",
      subtitle:
        "Capture your favorite memories with your significant other effortlessly.",
    },
    {
      key: "2",
      title: "Remember your Moments",
      subtitle: "Look back on your cherished moments anytime, anywhere.",
    },
    {
      key: "3",
      title: "Get Started",
      subtitle: "Be in love, capture moments, and create memories.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4">
      <AnimatedPagerView
        ref={ref}
        initialPage={0}
        style={{ flex: 1 }}
        onPageScroll={handlePageScrollCombined}
      >
        {pages.map((p) => (
          <View
            key={p.key}
            className="flex-1 items-center justify-center px-6 space-y-4"
          >
            <Text className="text-3xl font-bold text-center text-foreground">
              {p.title}
            </Text>
            <Text className="text-base text-muted-foreground text-center">
              {p.subtitle}
            </Text>
          </View>
        ))}
      </AnimatedPagerView>

      <View className="items-center py-8">
        <ExpandingDot
          data={Array.from({ length: size })}
          //@ts-ignore
          scrollX={scrollX}
          expandingDotWidth={30}
          inActiveDotOpacity={0.6}
          dotClassName="w-[10px] h-[10px] rounded-full"
        />
      </View>

      {page < size - 1 ? (
        <View className="flex-row justify-between px-4">
          <Button
            onPress={() => router.replace("/(app)/connect")}
            variant="ghost"
          >
            <Text>Skip</Text>
          </Button>
          <Button onPress={handleContinue}>
            <Text>Continue</Text>
          </Button>
        </View>
      ) : (
        <Button onPress={() => router.replace("/(app)/connect")}>
          <Text>Get Started</Text>
        </Button>
      )}
    </SafeAreaView>
  );
}
