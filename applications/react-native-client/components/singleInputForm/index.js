import * as React from "react";
import { View, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import styles from "./styles";

const SingleInputForm = ({
  onSubmit,
  disabled,
  inputPlaceholder,
  buttonValue
}) => {
  const { colors } = useTheme();

  const [value, setValue] = React.useState("");

  return (
    <View style={styles.content}>
      <TextInput
        placeholder={inputPlaceholder}
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text }
        ]}
        onChangeText={setValue}
        value={value}
      />
      <Button
        mode="contained"
        onPress={() => {
          onSubmit(value);
          setValue("");
        }}
        style={styles.button}
        disabled={disabled || !value}
      >
        {buttonValue}
      </Button>
    </View>
  );
};

export default SingleInputForm;
