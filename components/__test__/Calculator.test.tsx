import { render, fireEvent } from "@testing-library/react-native";
import Calculator from "../Calculator";
import { ReduxProvider, store } from "../../store";

describe("current value interation test", () => {
  test("should render 0 as an initial current value", () => {
    const { getByTestId } = render(
      <ReduxProvider reduxStore={store}>
        <Calculator />
      </ReduxProvider>
    );

    const currentValue = getByTestId("currentValue");

    expect(currentValue.props.children).toBe("0");
  });
});
