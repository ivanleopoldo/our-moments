import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export function CoupleAvatar() {
  return (
    <View className="items-center justify-end flex-row gap-1">
      <Avatar alt="@mrzachnugent" className="border-border border">
        <AvatarImage source={{ uri: "https://github.com/mrzachnugent.png" }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
      <Entypo className="text-primary" size={24} name="infinity" />
      <Avatar alt="@leerob" className="border-border border">
        <AvatarImage source={{ uri: "https://github.com/leerob.png" }} />
        <AvatarFallback>
          <Text>LR</Text>
        </AvatarFallback>
      </Avatar>
    </View>
  );
}
