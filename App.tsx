import Calculator from "./components/Calculator";
import { store } from "./store";
// import { Provider } from "react-redux";
import { ReduxProvider } from './store'

const App = () => {
  return (
    <ReduxProvider reduxStore={store}>
      <Calculator />
    </ReduxProvider>
  );
};

export default App;
