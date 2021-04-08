import React, { useEffect } from "react";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import "./dist/css/styles.min.css";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

//*Redux Components
import { Provider } from "react-redux"; //*Provider connects the react and redux parts.
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  //* Each time component is rendered , this useEffect hook is triggered.
  useEffect(() => {
    store.dispatch(loadUser()); //* Actions are dispatched only by accessing the store directly .. since we have access to the store here...
  }, []); //* [] -> Represent the useEffect hook is run onMount of each component..

  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
