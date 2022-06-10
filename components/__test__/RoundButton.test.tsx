import { render, fireEvent, act } from "@testing-library/react-native";
import { ReduxProvider, store } from "../../store";
import RoundButton from "../RoundButton";
import React from "react";
import ReactNative from "react-native";

// Timer
jest.useFakeTimers();

// Spyon useState
const setStateMock = jest.fn();
const useStateMock: any = (state: any) => [state, setStateMock];
const mockedUseState = jest.spyOn(React, "useState");
mockedUseState.mockImplementation(useStateMock);

// Spyon useColorScheme
const mockedUseColorScheme = jest.spyOn(ReactNative, "useColorScheme");

describe("round button appearance test", () => {
  beforeEach(() => {
    mockedUseColorScheme.mockClear();
  });

  it("should render a times button (value of '*')", () => {
    const { getByTestId } = render(
      <ReduxProvider reduxStore={store}>
        <RoundButton value="*" />
      </ReduxProvider>
    );
    const timesButton = getByTestId("*");

    expect(timesButton.props.children).toBeTruthy();
  });

  it("should render a number button (value of '2') ", () => {
    mockedUseColorScheme.mockImplementationOnce(() => "dark");
    const { getByTestId } = render(
      <ReduxProvider reduxStore={store}>
        <RoundButton value={2} />
      </ReduxProvider>
    );
    
    const numberButton = getByTestId("2");
  
    expect(numberButton.props.children).toBeTruthy();
  });

  it("should set isPress to false, after 200 miliseconds pressOut", () => {
    const { getByTestId } = render(
      <ReduxProvider reduxStore={store}>
        <RoundButton value={5} />
      </ReduxProvider>
    );

    act(() => {
      fireEvent(getByTestId("5"), "pressIn");
      fireEvent(getByTestId("5"), "pressOut");
      jest.advanceTimersByTime(200); // setTimeOut(200)
    });

    // After setTimeOut, setIsPress(false)
    expect(setStateMock).toHaveBeenCalledWith(false);
  });

});
