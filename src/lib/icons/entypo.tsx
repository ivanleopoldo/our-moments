import { Entypo as BaseEntypo } from "@expo/vector-icons";
import { cssInterop } from "nativewind";

export const Entypo = cssInterop(BaseEntypo, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});
