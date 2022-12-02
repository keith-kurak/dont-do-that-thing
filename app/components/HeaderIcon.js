import { TouchableOpacity, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../theme";

export default function HeaderIcon({ name, onPress, isSelectable = false, isSelected = false }) {
  const { colors } = useTheme();
  const Touchable = isSelectable ?  Pressable : TouchableOpacity;
  return (
    <Touchable onPress={onPress}>
      <Feather
        name={name}
        size={24}
        color={isSelectable ? (isSelected ? colors.tint : colors.secondary) : colors.primary}
      />
    </Touchable>
  );
}
