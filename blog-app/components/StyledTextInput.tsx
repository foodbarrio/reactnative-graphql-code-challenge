import * as React from "react";
import { TextInput, TextInputProps } from "react-native";
import Colors from "../constants/Colors";

export function StyledTextInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[
        {
          backgroundColor: Colors.BLUE,
          fontFamily: "quicksand-light",
          fontSize: 16,
          padding: 7.5,
          color: "white",
          paddingTop: 12.5,
          paddingBottom: 12.5,
          borderRadius: 5,
        },
        props.style,
      ]}
    />
  );
}
