import React, { useEffect } from "react";
import Grid from "./Grid";
import { Provider } from "react-redux"; //*Provider connects the react and redux parts.
import store from "./store";
import { loadTheme } from "./actions/theme";
import { loadUser } from "./actions/auth";
import "./dist/css/styles.min.css";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //* Each time component is rendered , this useEffect hook is triggered.
  useEffect(() => {
    store.dispatch(loadUser()); //* Actions are dispatched only by accessing the store directly .. since we have access to the store here...
    store.dispatch(loadTheme());
  }, []); //* [] -> Represent the useEffect hook is run onMount of each component..
  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
};

export default App;
