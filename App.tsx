import Calculator from "./components/Calculator";
import { store } from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
};

export default App;
