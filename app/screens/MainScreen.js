import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Text } from "react-native";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { random } from "lodash";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import HeaderIcon from "../components/HeaderIcon";
import RoundButton from "../components/RoundButton";
import { useStore } from "../stores/RootStore";
import { delay } from "../util";

const SettingsHeaderButton = observer(({ onPress }) => {
  return <HeaderIcon name="settings" onPress={onPress} />;
});

const RollButton = observer(({ onPress, isEnabled, title, type = "round" }) => {
  const height = useSharedValue(type === "round" ? 200 : 80);
  const width = useSharedValue(type === "round" ? 200 : 340);
  const borderRadius = useSharedValue(type === "round" ? 100 : 40);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
      borderRadius: borderRadius.value,
    };
  });

  useEffect(() => {
    height.value = withTiming(type === "round" ? 200 : 80);
    width.value = withTiming(type === "round" ? 200 : 340);
    borderRadius.value = withTiming(type === "round" ? 100 : 40);
  }, [type]);

  return (
    <Pressable onPress={isEnabled ? onPress : () => {}}>
      <Animated.View
        style={[
          type === "round"
            ? {
                //height: 200,
                //width: 200,
                backgroundColor: isEnabled ? "blue" : "gray",
                borderRadius: 100,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                //width: 340,
                //height: 80,
                borderRadius: 40,
                backgroundColor: "gray",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              },
          animatedButtonStyle,
        ]}
      >
        <Text
          ellipsizeMode="tail"
          style={{ color: "white", fontSize: 30, textAlign: "center" }}
        >
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
});

function easeOutCubic(x) {
  // see https://easings.net/#
  //return 1 - Math.pow(1 - x, 3);
  return x * x * x * x;
}

const MainScreen = observer(() => {
  const insets = useSafeAreaInsets();
  const { addThingToDo, thingsToDoSorted } = useStore();

  const rollDice = useCallback(() => {
    setDiceStatus("rolling");
    (async () => {
      const iterationSize = 40 + random(0, thingsToDoSorted.length);
      for (let i = 0; i < iterationSize; i++) {
        setCurrentItem(thingsToDoSorted[i % thingsToDoSorted.length].name);
        await delay(30 + easeOutCubic(i / iterationSize) * 300);
      }
      setCurrentItem(thingsToDoSorted[random(0, thingsToDoSorted.length - 1)].name);
      setDiceStatus("rolled");
    })();
  }, [thingsToDoSorted]);

  const [diceStatus, setDiceStatus] = useState("notRolled");
  const [currentItem, setCurrentItem] = useState(null);

  const postRollControls = (
    <>
      <View
        style={{ marginTop: 24, flexDirection: "row", justifyContent: "space-around" }}
      >
        <RoundButton
          title="Do this"
          onPress={() => {}}
          backgroundColor="green"
          textColor="white"
        />
        <RoundButton title="Roll again" onPress={rollDice} />
      </View>
    </>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      {diceStatus === "rolled" && (
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 12 }}>
          You can...
        </Text>
      )}
      <RollButton
        title={diceStatus !== "notRolled" ? currentItem : `Do\nSomething\nElse`}
        onPress={rollDice}
        isEnabled={diceStatus !== "rolling"}
        type={diceStatus !== "rolled" ? "round" : "rect"}
      />
      {diceStatus === "rolled" && postRollControls}
    </View>
  );
});

export { MainScreen, SettingsHeaderButton };
