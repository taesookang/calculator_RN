import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import React, { useEffect } from "react";
import { DigitValue, OperatorValue } from "../types";
import Operator from "./Operator";
import { RootState } from "../store";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { appendToCurrentValue, handleOperator } from "../store/reducer";

interface Props {
  value: DigitValue | OperatorValue | null;
}

const RoundButton: React.FC<Props> = ({ value }) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const theme = useColorScheme();
  const darkMode = theme === "dark";

  const dispatch = useAppDispatch();
  const { operator } = useAppSelector((state: RootState) => state.calculator);

  function isInputValue(arg: DigitValue | OperatorValue): arg is DigitValue {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."].includes(arg);
  }
  function isOperator(arg: DigitValue | OperatorValue): arg is OperatorValue {
    const operators: Array<number | string> = ["%", "/", "*", "-", "+", "-"];
    return operators.includes(arg);
  }

  useEffect(() => {
    value === operator ? setIsPressed(true) : setIsPressed(false);
  }, [operator]);

  const handlePress = () => {
    if (value !== null) {
      setIsPressed(true);
      if (isInputValue(value)) {
        dispatch(appendToCurrentValue(value));
      } else {
        dispatch(handleOperator(value));
      }
    }
  };

  return value !== null ? (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={handlePress}
      onPressOut={() => {
        if (!isOperator(value))
          setTimeout(() => {
            setIsPressed(false);
          }, 200);
      }}
      key={value}
      testID={value.toString()}
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
          {isInputValue(value) ? (
            <Text style={styles({ darkMode, isPressed, value }).number}>
              {value}
            </Text>
          ) : (
            <Operator isPressed={isPressed} value={value} theme={theme} />
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

export default RoundButton;

const styles = ({
  darkMode,
  isPressed,
  value,
}: {
  darkMode: boolean;
  isPressed: boolean;
  value?: DigitValue | OperatorValue;
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
