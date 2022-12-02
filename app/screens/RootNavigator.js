import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainScreen, SettingsHeaderButton } from "./MainScreen";
import { SettingsScreen } from "./SettingsScreen";
import { StoreProvider } from "../stores/RootStore";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <SettingsHeaderButton
                    onPress={() => {
                      navigation.navigate("Settings");
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default RootNavigator;
