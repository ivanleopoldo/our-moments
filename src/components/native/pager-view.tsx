import React, { forwardRef } from "react";
import BasePagerView, {
  PagerViewProps as BasePagerViewProps,
} from "react-native-pager-view";
import { cssInterop } from "nativewind";

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
