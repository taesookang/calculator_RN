import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { OperatorValue, DigitValue } from "../types";

interface ResultState {
  currentValues: Array<number | "." | "-">;
  x: number | null;
  y: number | null;
  operator: OperatorValue | null;
  result: number | null;
}

const initialState: ResultState = {
  currentValues: [0],
  x: null,
  y: null,
  operator: null,
  result: null,
};

// refactoring needed
// when press "." after x is set, it should append 0 to currentValue[0]
// when press "=" after getting a result, it empties currentvalues array.
// should maintain current value. done!
export const counterReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetState: (state) => {
      state.x = null;
      state.y = null;
      state.operator = null;
    },
    appendToCurrentValue: (state, action: PayloadAction<DigitValue>) => {
        if(state.currentValues.length > 9) {
            return
        }
      if (state.currentValues[0] === 0 && state.currentValues.length === 1) {
        state.currentValues.pop();

        if (action.payload === ".") {
          counterReducer.caseReducers.resetCurrentValue(state);
        }

        if(!state.x && state.operator) {
            state.x = 0
        }

      } else if (state.y) {
        counterReducer.caseReducers.resetState(state);
        state.currentValues = [];
      } else {
        if (state.operator && !state.x) {
          state.x = parseFloat(state.currentValues.join(""));
          state.currentValues = [];
        }
      }

      if (state.result) {
        state.result = null;
        state.currentValues = [];
      }
      if ( !state.currentValues.length  && action.payload === "." ) {
        state.currentValues.unshift(0)
      }
      state.currentValues.push(action.payload);

      console.log(state);
    },
    resetCurrentValue: (state) => {
      if (state.currentValues[0] === 0 && state.currentValues.length === 1) {
        if (state.operator !== null) {
          state.operator = null;
          state.x = null;
        }
      }
      state.currentValues = [0];
      console.log("reset");
    },

    handleOperator: (state, action: PayloadAction<OperatorValue>) => {
      switch (action.payload) {
        case "AC":
          counterReducer.caseReducers.resetCurrentValue(state);
          break;

        case "=":
          //   if (!state.x && !state.result && !state.operator) {
          //     if (state.currentValues[0] === ".") {
          //       state.currentValues.unshift(0);
          //     }
          //   }
          if (state.x || state.x === 0) {
            counterReducer.caseReducers.setY(state, {
              payload: parseFloat(state.currentValues.join("")),
              type: "setY",
            });
            state.currentValues = [];
            counterReducer.caseReducers.excuteCalculation(state);
            counterReducer.caseReducers.resetState(state);
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
          if (state.operator === action.payload) {
            state.operator = null;
          } else {
            state.operator = action.payload;
          }
      }

      console.log(state);
    },

    setX: (state, action: PayloadAction<number>) => {
      state.x = action.payload;
    },

    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
    },

    setResult: (state, action: PayloadAction<number>) => {
      const result = action.payload;
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
      switch (state.operator) {
        case "+":
          counterReducer.caseReducers.setResult(state, {
            payload: state.x! + state.y!,
            type: "result",
          });
          break;
        case "-":
          counterReducer.caseReducers.setResult(state, {
            payload: state.x! - state.y!,
            type: "result",
          });
          break;
        case "*":
          counterReducer.caseReducers.setResult(state, {
            payload: state.x! * state.y!,
            type: "result",
          });
          break;
        case "/":
          counterReducer.caseReducers.setResult(state, {
            payload: state.x! / state.y!,
            type: "result",
          });
          break;
        case "%":
          counterReducer.caseReducers.setResult(state, {
            payload: state.x! % state.y!,
            type: "result",
          });

        default:
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
  excuteCalculation,
} = counterReducer.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.currentValues;

export default counterReducer.reducer;
