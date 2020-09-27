import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

const SplashView = () => {
  return (
    <View style={styles.content}>
      <ActivityIndicator />
    </View>
  );
};

export default SplashView;
