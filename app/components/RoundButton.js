import React from "react";
import { View, Pressable, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const RoundButton = ({
  onPress,
  isEnabled = true,
  title,
  backgroundColor = "white",
  textColor = "black",
}) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Pressable onPress={isEnabled ? onPress : () => {}}>
        <View
          style={{
            height: 40,
            paddingHorizontal: 18,
            backgroundColor,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: backgroundColor === "white" ? "black" : backgroundColor,
          }}
        >
          <Text style={{ color: textColor, fontSize: 16, textAlign: "center" }}>
            {title}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default RoundButton;
