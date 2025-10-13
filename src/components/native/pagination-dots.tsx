import { ExpandingDot as BaseExpandingDot } from "react-native-animated-pagination-dots";
import { cssInterop, useColorScheme } from "nativewind";
import { NAV_THEME } from "@/lib/theme";
import { ExpandingDotProps as BaseExpandingDotProps } from "react-native-animated-pagination-dots/lib/typescript/src/dots/ExpandingDot";

export type ExpandingDotProps = BaseExpandingDotProps;

const InteropExpandingDot = cssInterop(BaseExpandingDot, {
  className: { target: "containerStyle" },
  dotClassName: {
    target: "dotStyle",
    nativeStyleToProp: {
      backgroundColor: "inActiveDotColor",
    },
  },
});

export const ExpandingDot = (
  props: React.ComponentProps<typeof InteropExpandingDot>,
) => {
  const { colorScheme } = useColorScheme();

  const theme = NAV_THEME[colorScheme ?? "light"];

  return (
    <InteropExpandingDot
      {...props}
      inActiveDotColor={props.inActiveDotColor ?? theme.colors.border}
      activeDotColor={props.activeDotColor ?? theme.colors.primary}
    />
  );
};
