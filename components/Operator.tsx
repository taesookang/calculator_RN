import { ColorSchemeName } from "react-native";
import React, { useState, useEffect } from "react";

import Svg, { Rect, Path } from "react-native-svg";
import { OperatorValue, DigitValue } from "../types";

interface Props {
  value: OperatorValue | DigitValue | null;
  isPressed: boolean;
  theme: ColorSchemeName;
}

const Operator: React.FC<Props> = ({ value, isPressed, theme }) => {

  const [fill, setFill] = useState("");
  useEffect(() => {
    if (theme === "dark") {
      if (isPressed) {
        setFill("#808080");
      } else {
        setFill("#cbcbcb");
      }
    } else {
      if (isPressed) {
        setFill("#1E1E1E");
      } else {
        setFill("#505050");
      }
    }
  }, [theme, isPressed]);

  switch (value) {
    case "+/-":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_sign"
        >
          <Rect x="40" y="46" width="10" height="2.5" fill={fill} />
          <Rect x="20" y="26" width="13" height="2.5" fill={fill} />
          <Rect
            x="25"
            y="34"
            width="13"
            height="2.5"
            transform="rotate(-90 25 34)"
            fill={fill}
          />
          <Rect
            x="25"
            y="47"
            width="28.2178"
            height="2.5"
            transform="rotate(-45 25 47)"
            fill={fill}
          />
        </Svg>
      );
    case "+":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_plus"
        >
          <Rect x="26.1421" y="34.6863" width="20" height="3" fill={fill} />
          <Rect
            x="34.6274"
            y="46"
            width="20"
            height="3"
            transform="rotate(-90 34.6274 46)"
            fill={fill}
          />
        </Svg>
      );
    case "-":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_minus"
        >
          <Rect x="26.1421" y="34.6863" width="20" height="3" fill={fill} />
        </Svg>
      );
    case "AC":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_ac"
        >
          <Path
            d="M32.2954 46H35.4199L28.5513 26.9761H25.3608L18.4922 46H21.564L23.3042 40.8584H30.5552L32.2954 46ZM26.8901 30.1401H26.9692L29.8037 38.4854H24.0557L26.8901 30.1401ZM44.8594 46.3164C49.2363 46.3164 52.2158 44.0093 52.9409 40.0806H50.001C49.4077 42.3745 47.5225 43.7324 44.8726 43.7324C41.3789 43.7324 39.1641 40.9243 39.1641 36.4814C39.1641 32.0781 41.4053 29.2437 44.8594 29.2437C47.4434 29.2437 49.4736 30.8389 50.001 33.2778H52.9277C52.4268 29.3096 49.1704 26.6597 44.8594 26.6597C39.5464 26.6597 36.145 30.4565 36.145 36.4814C36.145 42.5459 39.52 46.3164 44.8594 46.3164Z"
            fill={fill}
          />
        </Svg>
      );
    case "%":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_modular"
        >
          <Rect
            x="25"
            y="45"
            width="28.2178"
            height="2.5"
            transform="rotate(-45 25 45)"
            fill={fill}
          />
          <Path
            d="M31.75 28.5C31.75 30.3173 30.3173 31.75 28.5 31.75C26.6827 31.75 25.25 30.3173 25.25 28.5C25.25 26.6827 26.6827 25.25 28.5 25.25C30.3173 25.25 31.75 26.6827 31.75 28.5Z"
            stroke={fill}
            strokeWidth={2.5}
          />
          <Path
            d="M46.75 43.5C46.75 45.3173 45.3173 46.75 43.5 46.75C41.6827 46.75 40.25 45.3173 40.25 43.5C40.25 41.6827 41.6827 40.25 43.5 40.25C45.3173 40.25 46.75 41.6827 46.75 43.5Z"
            stroke={fill}
            strokeWidth={2.5}
          />
        </Svg>
      );
    case "/":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_divide"
        >
          <Rect x="26.1421" y="34" width="20" height="3" fill={fill} />
          <Path
            d="M36 30C37.6718 30 39 28.6718 39 27C39 25.3282 37.6718 24 36 24C34.3282 24 33 25.3282 33 27C33 28.6718 34.3282 30 36 30Z"
            fill={fill}
          />
          <Path
            d="M36 47C37.6718 47 39 45.6718 39 44C39 42.3282 37.6718 41 36 41C34.3282 41 33 42.3282 33 44C33 45.6718 34.3282 47 36 47Z"
            fill={fill}
          />
        </Svg>
      );
    case "*":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_multiply"
        >
          <Rect
            x="28.1421"
            y="42.1421"
            width="20"
            height="3"
            transform="rotate(-45 28.1421 42.1421)"
            fill={fill}
          />
          <Rect
            x="42.1421"
            y="44.1421"
            width="20"
            height="3"
            transform="rotate(-135 42.1421 44.1421)"
            fill={fill}
          />
        </Svg>
      );
    case "=":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_equal"
        >
          <Rect x="26.1421" y="39" width="20" height="3" fill="#505050" />
          <Rect x="26.1421" y="30" width="20" height="3" fill="#505050" />
        </Svg>
      );

    case ".":
      return (
        <Svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          testID="icon_dot"
        >
          <Path
            d="M36 39C37.6718 39 39 37.6718 39 36C39 34.3283 37.6718 33 36 33C34.3282 33 33 34.3283 33 36C33 37.6718 34.3282 39 36 39Z"
            fill={fill}
          />
        </Svg>
      );

    default:
      return <></>;
  }
};

export default Operator;

