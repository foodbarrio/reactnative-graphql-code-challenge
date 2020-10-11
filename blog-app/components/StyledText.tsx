import * as React from "react";
import Colors from "../constants/Colors";

import { Text } from "react-native";

type TextProps = Text["props"];

export function Bold(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "quicksand-bold", fontSize: 40, color: Colors.BLUE },
        props.style,
      ]}
    />
  );
}

export function Medium(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "quicksand-medium", fontSize: 16, color: Colors.BLUE },
        props.style,
      ]}
    />
  );
}

export function Regular(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "quicksand-regular", fontSize: 16, color: Colors.BLUE },
        props.style,
      ]}
    />
  );
}
