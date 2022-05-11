import { StyleSheet, useColorScheme } from "react-native";
import React from "react";

import Svg, { Rect } from "react-native-svg";

const PosNegSwitch = () => {

  const theme =  useColorScheme()
  return (
    <Svg width="30" height="28" viewBox="0 0 30 28" fill="none">
      <Rect x="20" y="25" width="10" height="2.5" fill={theme === "dark" ? "":"#808080"} />
      <Rect y="5" width="13" height="2.5" fill={theme === "dark" ? "":"#808080"} />
      <Rect
        x="5"
        y="13"
        width="13"
        height="2.5"
        transform="rotate(-90 5 13)"
        fill={theme === "dark" ? "":"#808080"}
      />
      <Rect
        x="5"
        y="26"
        width="28.2178"
        height="2.5"
        transform="rotate(-45 5 26)"
        fill={theme === "dark" ? "":"#808080"}
      />
    </Svg>
  );
};

export default PosNegSwitch;

const styles = StyleSheet.create({});
