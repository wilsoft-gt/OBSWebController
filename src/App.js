import "./styles.css";
import GenerateStore from "./redux/configureStore";
import { Provider } from "react-redux";

import { MainView } from './views/Main'

export default function App() {
  const store = GenerateStore();
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
}
