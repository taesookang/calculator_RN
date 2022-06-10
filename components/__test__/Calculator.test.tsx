import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { renderHook } from "@testing-library/react-hooks";
import Calculator from "../Calculator";
import { ReduxProvider, store } from "../../store";
import { resetAllState, handleOperator, setY } from "../../store/reducer";

const component = (
  <ReduxProvider reduxStore={store}>
    <Calculator />
  </ReduxProvider>
);

describe("current value interaction it", () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(resetAllState());
    });
  });

  it("should render 0 as an initial current value", () => {
    const { getByTestId } = render(component);

    const currentValue = getByTestId("currentValue");

    expect(currentValue.props.children).toBe("0");
  });

  it("should not update current value when press '=', when current value is 0 ", () => {
    const { getByTestId } = render(component);

    const currentValue = getByTestId("currentValue");

    act(() => {
      fireEvent.press(getByTestId("="));
    });

    expect(currentValue.props.children).toBe("0");
  });

  it("should be unable to append to currentValues, when currentValues.length > 9", () => {
    const { getByTestId } = render(component);

    act(() => {
      // press 1 => 12 times
      for (let i = 0; i < 12; i++) {
        fireEvent.press(getByTestId("1"));
      }
    });
    const currentValue = getByTestId("currentValue").props.children;

    // current value length should be max 10.
    expect(currentValue.length).toEqual(10);
  });

  it("should render 0.2 when press '.' and '2'", () => {
    const { getByTestId } = render(component);

    act(() => {
      fireEvent.press(getByTestId("."));
      fireEvent.press(getByTestId("2"));
    });
    const currentValue = getByTestId("currentValue").props.children;

    expect(currentValue).toBe("0.2");
  });

  it("should assign x = 0, when appending a value after an operator is selected.", () => {
    const { getByTestId } = render(component);
    
    act(() => {
      store.dispatch(handleOperator("+"));
      fireEvent.press(getByTestId("2"));
    });

    expect(store.getState().calculator.x).toBe(0);
  });

  it("should update current value to 0. when press '.' after the previous calculation", () => {
    const { getByTestId } = render(component);

    act(() => {
      fireEvent.press(getByTestId("1"));
      fireEvent.press(getByTestId("+"));
      fireEvent.press(getByTestId("1"));
      fireEvent.press(getByTestId("="));
      fireEvent.press(getByTestId("."));
    });

    const currentValues = store.getState().calculator.currentValues;

    expect(currentValues).toEqual([0, "."]);
  });

  it("should change sign of current value, when press +/-", () => {
    const { getByTestId } = render(component);

    act(() => {
      fireEvent.press(getByTestId("1"));
      fireEvent.press(getByTestId("+/-"));
      fireEvent.press(getByTestId("+/-"));
    });

    const currentValue = getByTestId("currentValue").props.children;

    expect(currentValue).toEqual("1");
  });
});

describe("calculation test", () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(resetAllState());
    });
  });

  describe("addition", () => {
    it("calculates 2 + 1 = 3 ", () => {
      const { getByTestId } = render(component);

      act(() => {
        fireEvent.press(getByTestId("2"));
        fireEvent.press(getByTestId("+"));
        fireEvent.press(getByTestId("1"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      () => expect(result).toEqual(3);
    });
    it("calculates 5.3 + 4.34 = 9.64 ", () => {
      const { getByTestId } = render(component);

      act(() => {
        fireEvent.press(getByTestId("5"));
        fireEvent.press(getByTestId("."));
        fireEvent.press(getByTestId("3"));
        fireEvent.press(getByTestId("+"));
        fireEvent.press(getByTestId("4"));
        fireEvent.press(getByTestId("."));
        fireEvent.press(getByTestId("3"));
        fireEvent.press(getByTestId("4"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      expect(result).toEqual(9.64);
    });
    it("calculates -3 + 8 = 5 ", () => {
      const { getByTestId } = render(component);

      act(() => {
        fireEvent.press(getByTestId("3"));
        fireEvent.press(getByTestId("+/-"));
        fireEvent.press(getByTestId("+"));
        fireEvent.press(getByTestId("8"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      expect(result).toEqual(5);
    });
    it("calculates 0 + 1 + 2 = 3 ", () => {
      const { getByTestId } = render(component);

      act(() => {
        fireEvent.press(getByTestId("+"));
        fireEvent.press(getByTestId("1"));
        fireEvent.press(getByTestId("+"));
        fireEvent.press(getByTestId("2"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      expect(result).toEqual(3);
    });
  });
  describe("subtraction", () => {
    it("calculates 29 - 12 = 17", () => {
      const { getByTestId } = render(component);

      act(() => {
        fireEvent.press(getByTestId("2"));
        fireEvent.press(getByTestId("9"));
        fireEvent.press(getByTestId("-"));
        fireEvent.press(getByTestId("1"));
        fireEvent.press(getByTestId("2"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      waitFor(() => expect(result).toEqual(17));
    });
  });
  describe("multiplication", () => {
    it("calculates 5 x 5 = 25 ", () => {
      const { getByTestId } = render(component);

      act(() => {
        fireEvent.press(getByTestId("5"));
        fireEvent.press(getByTestId("*"));
        fireEvent.press(getByTestId("5"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      expect(result).toEqual(25);
    });
  });
  describe("division calculation", () => {
    it("calculates 9 / 2 = 4.5", () => {
      const { getByTestId } = render(component);

      act(() => {
        /* fire events that update state */
        fireEvent.press(getByTestId("9"));
        fireEvent.press(getByTestId("/"));
        fireEvent.press(getByTestId("2"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      expect(result).toEqual(4.5);
    });
  });
  describe("modular calculation", () => {
    it("calculates 7 % 4 = 3", () => {
      const { getByTestId } = render(component);

      act(() => {
        /* fire events that update state */
        fireEvent.press(getByTestId("7"));
        fireEvent.press(getByTestId("%"));
        fireEvent.press(getByTestId("4"));
        fireEvent.press(getByTestId("="));
      });
      const result = store.getState().calculator.result;
      waitFor(() => expect(result).toEqual(3));
    });
  });
});

describe("when AC is pressed", () => {
  it("should set currentValue to 0", () => {
    const { getByTestId } = render(component);
    const cancelBtn = getByTestId("AC");

    act(() => {
      fireEvent.press(getByTestId("3"));
      fireEvent.press(getByTestId("2"));
      fireEvent.press(getByTestId("1"));
      fireEvent.press(cancelBtn);
    });

    const currentValue = store.getState().calculator.currentValues.join("");
    expect(currentValue).toBe("0");
  });

  it("should set operator to null when AC is pressed after currentValue is set to 0", () => {
    const { getByTestId } = render(component);
    const cancelBtn = getByTestId("AC");

    act(() => {
      fireEvent.press(getByTestId("1"));
      fireEvent.press(getByTestId("2"));
      fireEvent.press(getByTestId("*"));
      fireEvent.press(cancelBtn);
      fireEvent.press(cancelBtn);
    });

    expect(store.getState().calculator.x).toBeNull();
    expect(store.getState().calculator.operator).toBeNull();
  });
});
