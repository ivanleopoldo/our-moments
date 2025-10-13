import React, { forwardRef, useMemo, useRef } from "react";
import BasePagerView, {
  PagerViewProps as BasePagerViewProps,
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";
import { cssInterop } from "nativewind";
import { Animated, Dimensions, View } from "react-native";
import { Text } from "../ui/text";
import { ExpandingDot, type ExpandingDotProps } from "./pagination-dots";

export type PagerViewProps = BasePagerViewProps;

export type PagerViewRef = React.ComponentRef<typeof BasePagerView>;

export const PagerView = forwardRef<PagerViewRef, PagerViewProps>(
  (props, ref) => {
    return <BasePagerView ref={ref} {...props} style={props.style} />;
  },
);

cssInterop(PagerView, {
  className: { target: "style" },
});

PagerView.displayName = "PagerView";

export type PagerProps = {
  ref: React.Ref<PagerViewRef>;
  pages: { key: string; title: string; subtitle: string; imgUrl?: string }[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dotProps?: ExpandingDotProps;
  enableDots?: boolean;
} & PagerViewProps;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export function Pager({
  ref,
  pages,
  dotProps,
  enableDots = true,
  page,
  setPage,
  ...props
}: PagerProps) {
  const width = Dimensions.get("window").width;
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const size = pages.length;
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
  return (
    <>
      <AnimatedPagerView
        ref={ref}
        initialPage={0}
        style={{ flex: 1 }}
        {...props}
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

      {enableDots && (
        <View className="items-center py-8">
          <ExpandingDot
            {...dotProps}
            data={Array.from({ length: size })}
            //@ts-ignore
            scrollX={scrollX}
            expandingDotWidth={30}
            inActiveDotOpacity={0.6}
            dotClassName="w-[10px] h-[10px] rounded-full"
          />
        </View>
      )}
    </>
  );
}
