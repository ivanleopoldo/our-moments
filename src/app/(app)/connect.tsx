import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Connect() {
  return (
    <SafeAreaView className="flex-1 p-4 items-center gap-4 justify-center">
      <View className="items-center gap-2">
        <Text className="text-3xl font-bold text-center">
          Connect with your Partner
        </Text>
        <Text className="text-center text-muted-foreground font-semibold">
          Connect with your partner to start creating and saving memories
          together.
        </Text>
      </View>
      <View>
        <Card>
          <View>
            <Text>Invite your partner</Text>
          </View>
          <View>
            <Text>Invite your partner</Text>
          </View>
          <View>
            <Button></Button>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}
