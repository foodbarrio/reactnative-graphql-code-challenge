import * as React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

export function ArrowButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: Colors.PEACH,
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 10,
          paddingRight: 10,
          padding: 5,
          borderRadius: 15,
          width: 100,
        },
        props.style,
      ]}
    >
      <AntDesign name="arrowright" size={50} color="white" />
    </TouchableOpacity>
  );
}
