import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text } from "react-native";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderIcon from "../components/HeaderIcon";
import { useStore } from "../stores/RootStore";

const ThingToDo = observer(({ thing }) => {
  return (
    <View style={{ paddingVertical: 14, paddingHorizontal: 14 }}>
      <Text>{thing.name}</Text>
    </View>
  );
});

const SettingsScreen = observer(() => {
  const insets = useSafeAreaInsets();
  const { addThingToDo, thingsToDoSorted } = useStore();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={thingsToDoSorted}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => <ThingToDo thing={item} />}
      />
    </View>
  );
});

export { SettingsScreen };
