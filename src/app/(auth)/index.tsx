import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Fontisto } from "@/lib/icons/fontisto";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
        });
      } else {
        // no session
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  return (
    <SafeAreaView className="flex-1 p-6 items-center gap-4 justify-center">
      <View className="items-center gap-1">
        <Text className="font-bold text-center text-3xl">
          Welcome to Moments
        </Text>
        <Text className="text-lg text-center text-muted-foreground">
          Continue to create moments with your special one
        </Text>
      </View>
      <View className="gap-1 w-full">
        <Button onPress={onPress} variant={"outline"}>
          <Fontisto name="google" className="text-foreground" size={16} />
          <Text>Continue with Google</Text>
        </Button>
        <Button variant={"outline"}>
          <Fontisto name="apple" className="text-foreground" size={16} />
          <Text>Continue with Apple</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
