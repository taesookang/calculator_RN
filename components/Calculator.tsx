
import React, { useEffect } from 'react'

import { ColorSchemeName } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  useColorScheme,
} from "react-native";

import RoundButton from "./RoundButton";
import { DigitValue, OperatorValue } from "../types";

import { useSelector } from 'react-redux'
import { RootState } from '../store';
import { useAppSelector } from '../store/hooks';

const Calculator: React.FC = () => {

    const theme = useColorScheme();

    const { currentValues } = useAppSelector((state:RootState) => state.counter)

    const currentValue = currentValues.join("")
  
    // const { value } = useSelector((state:RootState) => state.counter)
  const rows: Array<Array<DigitValue | OperatorValue | null>> = [
    ["AC", "+/-", "%", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [null, 0, ".", "="],
  ];
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <View style={styles.outputPanel}>
        <Text style={themedStyles({ currentValues }).outputText}>{currentValue}</Text>
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
              <RoundButton value={value} key={value}/>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

export default Calculator

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
    
  });
  
  const themedStyles = ({ theme, currentValues }: { theme?: ColorSchemeName, currentValues?: Array<number | "." | "-"> }) =>
    StyleSheet.create({
      inputPanel: {
        width: "100%",
        flex: 2,
        backgroundColor: theme === "dark" ? "#1A1A1A" : "#F0F0F0",
        padding: 16,
        paddingBottom: 48,
        flexDirection: "column",
      },
      outputText: {
        color: "#fff",
        fontSize: currentValues && currentValues.length < 8 ? 80 : 56,
      },
    });