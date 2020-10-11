import React from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface AddButtonProps {
  onPress: (event: GestureResponderEvent) => void | undefined;
}

const AddButton: React.FC<AddButtonProps> = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <AntDesign name="pluscircle" size={60} color={Colors.BLUE_66} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    opacity: 0.5,
    bottom: 30,
    right: 20,
  },
});

export default AddButton;
