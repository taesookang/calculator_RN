import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { OperatorValue, DigitValue } from "../types";
import Decimal from "decimal.js";

interface CalcState {
  currentValues: Array<number | "." | "-">;
  x: number | null;
  y: number | null;
  operator: OperatorValue | null;
  result: number | null;
}

const initialState: CalcState = {
  currentValues: [0],
  x: null,
  y: null,
  operator: null,
  result: null,
};

export const calculator = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    resetInputState: (state) => {
      state.x = null;
      state.y = null;
      state.operator = null;
    },
    resetAllState: (state) => {
      calculator.caseReducers.resetInputState(state);
      state.currentValues = [0];
      state.result = null;
    },
    appendToCurrentValue: (state, action: PayloadAction<DigitValue>) => {
      if (state.currentValues.length > 9) {
        return;
      }
      if (state.currentValues[0] === 0 && state.currentValues.length === 1) {
        state.currentValues.pop();

        if (action.payload === ".") {
          calculator.caseReducers.resetCurrentValue(state);
        }

        if (!state.x && state.operator) {
          state.x = 0;
        }
      } else {
        if (state.operator && !state.x) {
          state.x = state.currentValues.includes(".")
            ? parseFloat(state.currentValues.join(""))
            : parseInt(state.currentValues.join(""));
          state.currentValues = [];
        }
      }

    //   if (state.y) {
    //     calculator.caseReducers.resetInputState(state);
    //     state.currentValues = [];
    //   }

      if (state.result) {
        state.result = null;
        state.currentValues = [];
      }
      if (!state.currentValues.length && action.payload === ".") {
        state.currentValues.unshift(0);
      }
      state.currentValues.push(action.payload);
    },
    resetCurrentValue: (state) => {
      if (state.currentValues[0] === 0 && state.currentValues.length === 1) {
        if (state.operator !== null) {
          state.operator = null;
          state.x = null;
        }
      }
      state.currentValues = [0];
    },

    handleOperator: (state, action: PayloadAction<OperatorValue>) => {
      switch (action.payload) {
        case "AC":
          calculator.caseReducers.resetCurrentValue(state);
          break;

        case "=":
          if (state.x || state.x === 0) {
            calculator.caseReducers.setY(state, {
              payload: state.currentValues.includes(".")
                ? parseFloat(state.currentValues.join(""))
                : parseInt(state.currentValues.join("")),
              type: "setY",
            });
            state.currentValues = [];
            calculator.caseReducers.excuteCalculation(state);
            calculator.caseReducers.resetInputState(state);
            break;
          } else {
            break;
          }

        case "+/-":
          state.currentValues[0] === "-"
            ? state.currentValues.shift()
            : state.currentValues.unshift("-");
          break;
        default:
          if (!state.x && state.operator) {
            // state.x = parseFloat(state.currentValues.join(""));
            calculator.caseReducers.setX(state, {payload: parseFloat(state.currentValues.join("")), type:"setX"})
            state.currentValues = [];
            calculator.caseReducers.excuteCalculation(state);
          }
          state.operator = action.payload;
      }
    },

    setX: (state, action: PayloadAction<number>) => {
      state.x = action.payload;
    },

    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
    },

    setResult: (state, action: PayloadAction<number>) => {
      Decimal.set({ precision: 10, rounding: 4 });
      const payload = action.payload;
      const result = Number(new Decimal(payload));
      state.result = result;
      result
        .toString()
        .split("")
        .forEach((num) => {
          if (num === "." || num === "-") {
            state.currentValues.push(num);
          } else {
            state.currentValues.push(parseInt(num));
          }
        });
    },

    excuteCalculation: (state) => {
      if ((state.x, state.y !== null)) {
        const x = new Decimal(state.x!);
        switch (state.operator) {
          case "+":
            calculator.caseReducers.setResult(state, {
              payload: Number(x.plus(state.y!)),
              type: "result",
            });
            break;
          case "-":
            calculator.caseReducers.setResult(state, {
              payload: Number(x.minus(state.y!)),
              type: "result",
            });
            break;
          case "*":
            calculator.caseReducers.setResult(state, {
              payload: Number(x.times(state.y!)),
              type: "result",
            });
            break;
          case "/":
            calculator.caseReducers.setResult(state, {
              payload: Number(x.div(state.y!)),
              type: "result",
            });
            break;
          case "%":
            calculator.caseReducers.setResult(state, {
              payload: Number(x.mod(state.y!)),
              type: "result",
            });

          default:
        }
      }
    },
  },
});

export const {
  appendToCurrentValue,
  resetCurrentValue,
  handleOperator,
  setX,
  setY,
  resetAllState,
  excuteCalculation,
} = calculator.actions;

export default calculator.reducer;
