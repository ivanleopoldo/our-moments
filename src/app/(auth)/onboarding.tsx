import { PagerView, PagerViewRef } from "@/components/native/pager-view";
import { Text } from "@/components/ui/text";
import React, { useRef, useMemo } from "react";
import { Animated, Dimensions, View } from "react-native";
import { ExpandingDot } from "@/components/native/pagination-dots";
import { PagerViewOnPageScrollEventData } from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function Onboarding() {
  const ref = useRef<PagerViewRef>(null);

  const width = Dimensions.get("window").width;
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  const onPageScroll = useMemo(
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

  const children = [
    <View key="1" className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Welcome to Moments</Text>
    </View>,
    <View key="2" className="flex-1 justify-center items-center">
      <Text>2</Text>
    </View>,
    <View key="3" className="flex-1 justify-center items-center">
      <Text>3</Text>
    </View>,
  ];

  const size = children.length;

  const inputRange = [0, size];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, size * width],
  });

  return (
    <SafeAreaView className="flex-1 p-4">
      <AnimatedPagerView
        ref={ref}
        initialPage={0}
        className="flex-1"
        onPageScroll={onPageScroll}
      >
        {children}
      </AnimatedPagerView>

      <View className="items-center">
        {
          <ExpandingDot
            data={Array.from({ length: size })}
            expandingDotWidth={30}
            //@ts-ignore
            scrollX={scrollX}
            inActiveDotOpacity={0.6}
            dotClassName="w-[10px] h-[10px] rounded-full"
          />
        }
      </View>
    </SafeAreaView>
  );
}
