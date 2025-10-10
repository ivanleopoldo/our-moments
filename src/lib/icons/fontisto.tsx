import { Fontisto as BaseFontisto } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

export const Fontisto = cssInterop(BaseFontisto, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});
