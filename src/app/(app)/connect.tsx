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
import { InputOTP } from "@/components/native/otp-input";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";

// TODO: on focus on input remove other cards and show only input
export default function Connect() {
  const scrollRef = useRef<ScrollView>(null);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <SafeAreaView className="flex-1 p-4">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="flex-grow justify-center items-center gap-8"
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

          <Pressable
            onPress={() => {
              Clipboard.setStringAsync("123564").then(() => setIsCopied(true));
            }}
            className="w-full"
          >
            <Card className="rounded-3xl p-6">
              <View className="gap-4">
                <View>
                  <Text className="font-bold text-xl">Invite your partner</Text>
                  <Text className="text-normal text-muted-foreground">
                    {isCopied ? "Copied!" : "Tap to copy!"}
                  </Text>
                </View>
                <InputOTP fixedCode="123564" />
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
                <InputOTP />
              </View>
              <View className="w-full">
                <Button onPress={() => router.replace("/(app)")}>
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
