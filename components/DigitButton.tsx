import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { DigitValue, OperatorValue } from "../types";
import Operator from "./Operator";

interface Props {
  value: DigitValue | OperatorValue | null;
}

const DigitButton: React.FC<Props> = ({ value }) => {
  const [isPressed, setIsPressed] = useState(false);
  const theme = useColorScheme();
  const darkMode = theme === "dark";

  return value ? (
    <TouchableWithoutFeedback
      onPress={() => setIsPressed(true)}
      onLongPress={() => setIsPressed(true)}
      onPressOut={() => {
        setTimeout(() => {
          setIsPressed(false);
        }, 200);
      }}
      key={value}
    >
      <View style={styles({ darkMode, isPressed }).topShadow}>
        <View
          style={[
            styles({ darkMode, isPressed, value }).numberButton,
            styles({ darkMode, isPressed }).bottomShadow,
          ]}
        >
          {/* value is 0 or able to be parsed to integer(type DigitValue)? => Text,
          otherwise => Operator */}
          {parseInt(value) || value === "0" ? (
            <Text style={styles({ darkMode, isPressed, value }).number}>
              {value}
            </Text>
          ) : (
            <Operator isPressed={isPressed} value={value} />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
      }}
    />
  );
};

export default DigitButton;

const styles = ({
  darkMode,
  isPressed,
  value,
}: {
  darkMode: boolean;
  isPressed: boolean;
  value?: string;
}) =>
  StyleSheet.create({
    numberButton: {
      flex: 1,
      aspectRatio: 1 / 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        value === "="
          ? isPressed
            ? "#FBC028"
            : "#FBD928"
          : darkMode
          ? isPressed
            ? "#0A0A0A"
            : "#1A1A1A"
          : isPressed
          ? "#E6E5E5"
          : "#F0F0F0",
      borderRadius: 100,
      width: "80%",
    },
    number: {
      color:
        value === "="
          ? "#505050"
          : darkMode
          ? isPressed
            ? "#808080"
            : "#E6E6E6"
          : isPressed
          ? "#1E1E1E"
          : "#505050",
      fontSize: value && value === "AC" ? 28 : 38,
    },
    topShadow: {
      shadowOffset: {
        width: -3,
        height: -3,
      },
      shadowOpacity: darkMode ? 0.5 : 1,
      shadowRadius: 5,
      shadowColor: darkMode ? "#313131" : "#fff",
      flex: 1,
      aspectRatio: 1 / 1,
      borderRadius: 100,
      marginHorizontal: 10,
    },
    bottomShadow: {
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: darkMode ? "#000000" : "#D1CDC7",
    },
  });
