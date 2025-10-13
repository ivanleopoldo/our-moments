import { Pager, PagerViewRef } from "@/components/native/pager-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const ref = useRef<PagerViewRef>(null);
  const [page, setPage] = useState(0);

  const handleContinue = () => {
    if (page < pages.length - 1) {
      ref.current?.setPage(page + 1);
    } else {
      console.log("🎉 Finished onboarding");
    }
  };

  const pages = [
    {
      key: "1",
      title: "Welcome to Moments",
      subtitle:
        "Capture your favorite memories with your significant other effortlessly.",
    },
    {
      key: "2",
      title: "Remember your Moments",
      subtitle: "Look back on your cherished moments anytime, anywhere.",
    },
    {
      key: "3",
      title: "Get Started",
      subtitle: "Be in love, capture moments, and create memories.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4">
      <Pager ref={ref} pages={pages} page={page} setPage={setPage} />
      {page < pages.length - 1 ? (
        <View className="flex-row justify-between px-4">
          <Button
            onPress={() => router.replace("/(app)/connect")}
            variant="ghost"
          >
            <Text>Skip</Text>
          </Button>
          <Button onPress={handleContinue}>
            <Text>Continue</Text>
          </Button>
        </View>
      ) : (
        <Button onPress={() => router.replace("/(app)/connect")}>
          <Text>Get Started</Text>
        </Button>
      )}
    </SafeAreaView>
  );
}
