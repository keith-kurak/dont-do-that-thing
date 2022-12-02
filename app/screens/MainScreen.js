import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Text } from "react-native";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { random } from "lodash";
import HeaderIcon from "../components/HeaderIcon";
import { useStore } from "../stores/RootStore";
import { delay } from "../util";

const SettingsHeaderButton = observer(({ onPress }) => {
  return <HeaderIcon name="settings" onPress={onPress} />;
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
    setIsDiceRolling(true);
    (async () => {
      const iterationSize = 40 + random(0, thingsToDoSorted.length);
      for (let i = 0; i < iterationSize; i++) {
        setCurrentItem(thingsToDoSorted[i % thingsToDoSorted.length].name);
        await delay(30 + easeOutCubic(i / iterationSize) * 300);
      }
      setIsDiceRolling(
        thingsToDoSorted[random(0, thingsToDoSorted.length - 1)]
          .name
      );
      setIsDiceRolling(false);
    })();
  }, [thingsToDoSorted]);

  const [isDiceRolling, setIsDiceRolling] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={!isDiceRolling ? rollDice : () => {}}>
        <View style={{ padding: 14, backgroundColor: "blue", borderRadius: 4 }}>
          <Text style={{ color: "white" }}>Roll</Text>
        </View>
      </Pressable>
      <Text style={{ marginTop: 14 }}>{currentItem}</Text>
    </View>
  );
});

export { MainScreen, SettingsHeaderButton };
