import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducer";
import { Provider } from "react-redux";
import { ReactNode } from "react";

export const store = configureStore({
  reducer: { counter: counterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;

interface Props {
  children: ReactNode;
  reduxStore: Store;
}

export const ReduxProvider: React.FC<Props> = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);
