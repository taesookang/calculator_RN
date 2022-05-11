import React, { useState, useEffect, useCallback } from "react";
import { ColorSchemeName, TouchableWithoutFeedback } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Touchable,
  StatusBar,
  useColorScheme,
  Button,
  Appearance,
} from "react-native";

import DigitButton from "./components/DigitButton";
import PosNegSwitch from "./components/PosNegSwitch";
import { DigitValue, OperatorValue } from "./types";

const App = () => {
  const theme = useColorScheme();

  const rows: Array<Array<DigitValue | OperatorValue | null>> = [
    ["AC", "+/-", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    [null, "0", ".", "="],
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.outputPanel}>
        <Text style={styles.outputText}>0</Text>
      </View>
      <View style={themedStyles({ theme }).inputPanel}>
        {rows.map((row, index) => (
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={index}
          >
            {row.map((value) => (
              <DigitButton value={value} key={value} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  outputPanel: {
    flex: 1,
    backgroundColor: "#141414",
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  outputText: {
    color: "#fff",
    fontSize: 80,
  },
});

const themedStyles = ({ theme }: { theme: ColorSchemeName }) =>
  StyleSheet.create({
    inputPanel: {
      width: "100%",
      flex: 2,
      backgroundColor: theme === "dark" ? "#1A1A1A" : "#F0F0F0",
      padding: 16,
      paddingBottom: 48,
      flexDirection: "column",
    },
  });

export default App;
