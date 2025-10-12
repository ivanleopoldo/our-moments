import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Share,
} from "react-native";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP } from "@/components/otp-input";
import * as Clipboard from "expo-clipboard";

export default function Connect() {
  const scrollRef = useRef<ScrollView>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleFocus = (yOffset: number) => {
    scrollRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View className="items-center gap-2">
            <Text className="text-4xl font-bold text-center">
              Connect with your partner
            </Text>
            <Text className="text-center text-muted-foreground">
              Connect with your partner to start creating and saving memories
              together.
            </Text>
          </View>

          <Pressable className="w-full">
            <Card className="rounded-3xl p-6">
              <View className="gap-4">
                <View>
                  <Text className="font-bold text-xl">Invite your partner</Text>
                  <Text className="text-normal text-muted-foreground">
                    {isCopied ? "Copied!" : "Tap to copy!"}
                  </Text>
                </View>
                <InputOTP
                  maxLength={6}
                  fixedCode="123564"
                  onFocus={() => handleFocus(200)}
                />
                <Button
                  onPress={() => {
                    Clipboard.setStringAsync("123564").then(() =>
                      setIsCopied(true),
                    );
                  }}
                  variant="outline"
                >
                  <Text>Copy my invite code</Text>
                </Button>
                <Button
                  onPress={() => {
                    Share.share({
                      message: "Join me on Moments! Use my invite code: 123564",
                    });
                  }}
                  variant="outline"
                >
                  <Text>Share my invite code!</Text>
                </Button>
              </View>
            </Card>
          </Pressable>

          <View className="w-full">
            <Card className="rounded-3xl p-6 gap-4">
              <View>
                <Text className="font-bold text-xl">
                  {"Enter your partner's code"}
                </Text>
                <Text className="text-normal text-muted-foreground">
                  Type it below!
                </Text>
              </View>
              <View className="justify-center items-center">
                <InputOTP maxLength={6} onFocus={() => handleFocus(600)} />
              </View>
              <View className="w-full">
                <Button>
                  <Text>Connect</Text>
                </Button>
              </View>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
